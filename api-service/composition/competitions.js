function makeCompetitions (db) {
  const makeSelectCompetitions = require('../repo/competitions/select')  
  const makeInsertCompetition = require('../repo/competitions/insert')
  const makeCompetitionsRouter = require('../routes/competitions')

  const selectCompetitions = makeSelectCompetitions(db)
  const inserCompetition = makeInsertCompetition(db)

  return makeCompetitionsRouter(selectCompetitions, inserCompetition)
}

module.exports = makeCompetitions
