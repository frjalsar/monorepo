import {mapCombinedEvents} from '../combinedevents/map'
import {editEvent} from 'types/event'
import {PoolClient} from 'pg'
import { makeUpdateEvent } from './update'
import {makeDeleteCombinedEvents} from '../combinedevents/delete'
import {makeInsertCombinedEvents} from '../combinedevents/insert'

export type MakeEditEvent=(db:PoolClient)=>editEvent

 export const makeEditEvent:MakeEditEvent=function (db) {
  return async function makeEditEvent (event, user) {
    const client = await db.connect()

    const updateEvent = makeUpdateEvent(client)
    const deleteCombinedEvents = makeDeleteCombinedEvents(client)
    const insertCombinedEvents = makeInsertCombinedEvents(client)

    try {
      await client.query('BEGIN')
      await updateEvent(event, user)

      if (event.typeId === 10 && event.childEvents && event.childEvents.length > 0) {
        const combinedEvents =event.childEvents.map(ev=>mapCombinedEvents(ev, event.id)) 
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

