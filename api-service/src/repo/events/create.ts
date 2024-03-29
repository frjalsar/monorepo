import { mapToCombinedEvents } from '../combinedevents/map'
import { CreateEvent } from 'types/events'
import { PoolClient } from 'pg'
import { makeInsertEvent } from '../events/insert'
import { makeDeleteCombinedEvents } from '../combinedevents/delete'
import { makeInsertCombinedEvents } from '../combinedevents/insert'

export type MakeCreateEvent = (db: PoolClient) => CreateEvent

export const makeCreateEvent: MakeCreateEvent = function (db) {
  return async function makeCreateEvent (event, user) {
    const client = await db.connect()

    const insertEvents = makeInsertEvent(client)
    const deleteCombinedEvents = makeDeleteCombinedEvents(client)
    const insertCombinedEvents = makeInsertCombinedEvents(client)

    try {
      await client.query('BEGIN')
      const eventId = await insertEvents(event, user)

      if (event.typeId === 10 && event.childEvents && event.childEvents.length > 0) {
        const combinedEvents = mapToCombinedEvents(event.childEvents, eventId)

        await deleteCombinedEvents(event.id, user)
        await insertCombinedEvents([combinedEvents], user)
      }

      await client.query('COMMIT')
      return event.id
    } catch (e) {
      await client.query('ROLLBACK')
      throw e
    } finally {
      client.release()
    }
  }
}
