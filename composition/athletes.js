function makeAthletes (pgPool, sqlConnection) {
  const makeSelectAthletes = require('../repo/athletes/select')
  const makeUpdateAthlete = require('../repo/athletes/update')
  const makeInsertAthlete = require('../repo/athletes/insert')
  const makeEditOrCreateAthlete = require('../repo/athletes/editOrCreate')
  const makeSelectClubs = require('../repo/clubs/select')
  const makeDisableMembership = require('../repo/membership/disable')
  const makeInsertMembership = require('../repo/membership/insert')
  const makeAthleteRoute = require('../routes/athletes')  

  // THOR - Remove in future
  const makeClubTransfer = require('../repo/thor/clubTransfer')
  const clubTransfer = makeClubTransfer(sqlConnection)
  
  const selectAthletes = makeSelectAthletes(pgPool)
  const editAthlete = makeEditOrCreateAthlete(makeUpdateAthlete, makeSelectClubs, makeDisableMembership, makeInsertMembership, pgPool, clubTransfer)
  const createAthlete = makeEditOrCreateAthlete(makeInsertAthlete, makeDisableMembership, makeInsertMembership, pgPool)

  

  return makeAthleteRoute(selectAthletes, editAthlete, createAthlete)
}

module.exports = makeAthletes