function makeThor (sqlConnection) {
  const makeSelectThorAchievements = require('../repo/thor/achievements')
  const makeSelectThorEvents = require('../repo/thor/events')
  const makeSelectMissingRunners = require('../repo/thor/selectMissingRunners')
  const makeThorRoute = require('../routes/thor')

  const selectThorEvents = makeSelectThorEvents(sqlConnection)
  const selectThorAchievements = makeSelectThorAchievements(sqlConnection)
  const selectMissingRunners = makeSelectMissingRunners(sqlConnection)

  return makeThorRoute(selectThorEvents, selectThorAchievements, selectMissingRunners)
}

module.exports = makeThor
