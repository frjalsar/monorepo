const mapCombinedEvents = require('../combinedevents/map')

function makeEditEvent (makeUpdateEvent, makeDeleteCombinedEvents, makeInsertCombinedEvents, db) {
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
        await deleteCombinedEvents(event.id)
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

module.exports = makeEditEvent