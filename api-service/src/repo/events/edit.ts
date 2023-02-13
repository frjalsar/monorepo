import { mapCombinedEvents } from '../combinedevents/map'
import { EditEvent } from 'types/events'
import { PoolClient } from 'pg'
import { makeDeleteCombinedEvents } from '../combinedevents/delete'
import { makeInsertCombinedEvents } from '../combinedevents/insert'
import { makeUpdateEvent } from '../events/update'

export type MakeEditEvent = (db: PoolClient) => EditEvent

export const makeEditEvent: MakeEditEvent = function (db) {
  return async function makeEditEvent (event, user) {
    const client = await db.connect()

    const updateEvent = makeUpdateEvent(client)
    const deleteCombinedEvents = makeDeleteCombinedEvents(client)
    const insertCombinedEvents = makeInsertCombinedEvents(client)

    try {
      await client.query('BEGIN')
      await updateEvent(event, user)

      if (event.typeId === 10 && event.childEvents && event.childEvents.length > 0) {
        const combinedEvents = mapCombinedEvents(event.childEvents, event.id)
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
