function makeMeets (db) {
  const makeSelectMeets = require('../repo/meets/select')
  const makeUpdateMeet = require('../repo/meets/update')
  const makeInsertMeet = require('../repo/meets/insert')
  const makeMeetsRouter = require('../routes/meets')

  const selectMeets = makeSelectMeets(db)
  const updateMeet = makeUpdateMeet(db)
  const insertMeet = makeInsertMeet(db)

  return makeMeetsRouter(selectMeets, updateMeet, insertMeet)
}

module.exports = makeMeets
