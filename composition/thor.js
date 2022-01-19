function makeThor(sqlConnection) {
  const makeSelectThorAchievements = require('../repo/thor/achievements')
  const makeSelectThorEvents = require('../repo/thor/events')
  const makeThorRoute = require('../routes/thor')
    
  const selectThorEvents = makeSelectThorEvents(sqlConnection)
  const selectThorAchievements = makeSelectThorAchievements(sqlConnection)  

  return makeThorRoute(selectThorEvents, selectThorAchievements)
}

module.exports = makeThor