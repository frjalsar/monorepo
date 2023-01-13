function makeThor (sqlConnection) {
  const makeSelectThorAchievements = require('../repo/thor/achievements')
  const makeSelectThorEvents = require('../repo/thor/events')
  const makeSelectMissingRunners = require('../repo/thor/selectMissingRunners')
  const makeUpdateMissingRunner = require('../repo/thor/updateMissingRunner')
  const makeThorRoute = require('../routes/thor')
  const makeSelectCompetitor = require('../repo/thor/selectCompetitor')

  const selectThorEvents = makeSelectThorEvents(sqlConnection)
  const selectThorAchievements = makeSelectThorAchievements(sqlConnection)
  const selectMissingRunners = makeSelectMissingRunners(sqlConnection)
  const selectCompetitor = makeSelectCompetitor(sqlConnection)
  const updateMissingRunner = makeUpdateMissingRunner(sqlConnection)

  return makeThorRoute(selectThorEvents, selectThorAchievements, selectMissingRunners, updateMissingRunner, selectCompetitor)
}

module.exports = makeThor
