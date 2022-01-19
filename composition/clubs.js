function makeClubs(db) {
  const makeSelectClubs = require('../repo/clubs/select')
  const makeInsertClub = require('../repo/clubs/insert')
  const makeUpdateClub = require('../repo/clubs/update')
  const makeClubsRouter = require('../routes/clubs')
  
  const selectClubs = makeSelectClubs(db)
  const insertClub = makeInsertClub(db)
  const updateClub = makeUpdateClub(db)

  return makeClubsRouter(selectClubs, insertClub, updateClub)
}

module.exports = makeClubs