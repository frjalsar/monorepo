function makeEvents (db) {
  const makeSelectEvents = require('../repo/events/select')
  const makeUpdateEvent = require('../repo/events/update')
  const makeInsertEvent = require('../repo/events/insert')
  const makeDeleteCombinedEvents = require('../repo/combinedevents/delete')
  const makeInsertCombinedEvents = require('../repo/combinedevents/insert')
  const makeEditEvent = require('../repo/events/edit')
  const makeCreateEvent = require('../repo/events/create')
  const makeEventsRouter = require('../routes/events')

  const selectEvents = makeSelectEvents(db)

  const editEvent = makeEditEvent(makeUpdateEvent, makeDeleteCombinedEvents, makeInsertCombinedEvents, db)
  const createEvent = makeCreateEvent(makeInsertEvent, makeDeleteCombinedEvents, makeInsertCombinedEvents, db)

  return makeEventsRouter(selectEvents, editEvent, createEvent)
}

module.exports = makeEvents