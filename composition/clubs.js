function makeClubs (db) {
  const makeSelectClubs = require('../repo/clubs/select')
  const makeUpdateClub = require('../repo/clubs/update')
  const makeInsertClub = require('../repo/clubs/insert')
  const makeClubsRouter = require('../routes/clubs')

  const selectClubs = makeSelectClubs(db)
  const insertClub = makeInsertClub(db)
  const updateClub = makeUpdateClub(db)

  return makeClubsRouter(selectClubs, updateClub, insertClub)
}

module.exports = makeClubs
