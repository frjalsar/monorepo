function makeEventTypes (db) {
  const makeSelectEventTypes = require('../repo/eventtypes/select')
  const makeUpdateEventType = require('../repo/eventtypes/update')
  const makeInsertEventType = require('../repo/eventtypes/insert')
  const makeEventTypesRouter = require('../routes/eventtypes')

  const selectEventTypes = makeSelectEventTypes(db)
  const updateEventType = makeUpdateEventType(db)
  const insertEventType = makeInsertEventType(db)

  return makeEventTypesRouter(selectEventTypes, updateEventType, insertEventType)
}

module.exports = makeEventTypes
