import {mapCombinedEvents} from '../combinedevents/map'
import { createEvent } from 'types/event'
import {Poolclient} from 'pg'
import {makeInsertEvent} from './insert'
import { makeDeleteCombinedEvents } from '../combinedevents/delete'
import { makeInsertCombinedEvents } from '../combinedevents/insert'
export type MakeCreateEvent=(db:Poolclient)=>createEvent

export const makeCreateEvent:MakeCreateEvent= function (db) {
  return async function makeCreateEvent (event, user) {
    const client = await db.connect()

    const insertEvents = makeInsertEvent(client)
    const deleteCombinedEvents = makeDeleteCombinedEvents(client)
    const insertCombinedEvents = makeInsertCombinedEvents(client)

    try {
      await client.query('BEGIN')
      const eventId = await insertEvents(event, user)

      if (event.typeId === 10 && event.childEvents && event.childEvents.length > 0) {
        const combinedEvents =event.childEvents.map(el=>mapCombinedEvents(el, eventId)) 

        await deleteCombinedEvents(event.id,user)
        await insertCombinedEvents(combinedEvents, user)
      }

      await client.query('COMMIT')
      return { eventId: event.id }
    } catch (e) {
      await client.query('ROLLBACK')
      throw e
    } finally {
      client.release()
    }
  }
}

