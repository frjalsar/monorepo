function makeMeets (db, sendMail) {
  const makeSelectMeets = require('../repo/meets/select')
  const makeSelectMeetAttachment = require('../repo/meets/selectattachment')
  const makeUpdateMeet = require('../repo/meets/update')
  const makeInsertMeet = require('../repo/meets/insert')
  const makeCreateMeet = require('../repo/meets/create')
  const makeInsertCompetition = require('../repo/competitions/insert')
  const makeMeetsRouter = require('../routes/meets')

  const selectMeets = makeSelectMeets(db)  
  const selectMeetAttachment = makeSelectMeetAttachment(db)
  const updateMeet = makeUpdateMeet(db)
  const createMeet = makeCreateMeet(makeInsertMeet, makeInsertCompetition, db, sendMail) 

  return makeMeetsRouter(selectMeets, selectMeetAttachment, updateMeet, createMeet)
}

module.exports = makeMeets
