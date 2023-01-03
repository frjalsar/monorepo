function makeThor (sqlConnection) {
  const makeSelectThorAchievements = require('../repo/thor/achievements')
  const makeSelectThorEvents = require('../repo/thor/events')
  const makeSelectMissingRunners = require('../repo/thor/selectMissingRunners')
  const makeThorRoute = require('../routes/thor')
  const makeSelectCompetitor = require('../repo/thor/selectCompetitor')

  const selectThorEvents = makeSelectThorEvents(sqlConnection)
  const selectThorAchievements = makeSelectThorAchievements(sqlConnection)
  const selectMissingRunners = makeSelectMissingRunners(sqlConnection)
  const selectCompetitor = makeSelectCompetitor(sqlConnection)

  return makeThorRoute(selectThorEvents, selectThorAchievements, selectMissingRunners, selectCompetitor)
}

module.exports = makeThor
