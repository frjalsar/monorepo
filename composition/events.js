function makeEvents (db) {
  const makeSelectEvents = require('../repo/events/select')
  const makeUpdateEvent = require('../repo/events/update')
  const makeInsertEvent = require('../repo/events/insert')
  const makeEventsRouter = require('../routes/events')

  const selectEvents = makeSelectEvents(db)
  const updateEvent = makeUpdateEvent(db)
  const insertEvent = makeInsertEvent(db)

  return makeEventsRouter(selectEvents, updateEvent, insertEvent)
}

module.exports = makeEvents
