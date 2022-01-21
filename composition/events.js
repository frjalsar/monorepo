function makeEvents (db) {
  const makeSelectEvents = require('../repo/events/select')
  const makeEventsRouter = require('../routes/events')

  const selectEvents = makeSelectEvents(db)
  return makeEventsRouter(selectEvents)
}

module.exports = makeEvents
