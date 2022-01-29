function makeMeets (db) {
  const makeSelectMeets = require('../repo/meets/select')
  const makeUpdateMeet = require('../repo/meets/update')
  const makeInsertMeet = require('../repo/meets/insert')
  const makeCreateMeet = require('../repo/meets/create')
  const makeInsertCompetition = require('../repo/competitions/insert')
  const makeMeetsRouter = require('../routes/meets')

  const selectMeets = makeSelectMeets(db)  
  const updateMeet = makeUpdateMeet(db)
  const createMeet = makeCreateMeet(makeInsertMeet, makeInsertCompetition, db)

  return makeMeetsRouter(selectMeets, updateMeet, createMeet)
}

module.exports = makeMeets
