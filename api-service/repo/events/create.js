const mapCombinedEvents = require('../combinedevents/map')

function makeCreateEvent (makeInsertEvent, makeDeleteCombinedEvents, makeInsertCombinedEvents, db) {
  return async function makeCreateEvent (event, user) {
    const client = await db.connect()

    const insertEvents = makeInsertEvent(client)
    const deleteCombinedEvents = makeDeleteCombinedEvents(client)
    const insertCombinedEvents = makeInsertCombinedEvents(client)

    try {
      await client.query('BEGIN')
      const eventId = await insertEvents(event, user)

      if (event.typeId === 10 && event.childEvents && event.childEvents.length > 0) {
        const combinedEvents = mapCombinedEvents(event.childEvents, eventId)

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

module.exports = makeCreateEvent
