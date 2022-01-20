function makeAthletes (db) {
  const makeSelectAthletes = require('../repo/athletes/select')  
  const makeUpdateAthlete = require('../repo/athletes/update')
  const makeInsertAthlete = require('../repo/athletes/insert')
  const makeEditOrCreateAthlete = require('../repo/athletes/editOrCreate')
  const makeDisableMembership = require('../repo/membership/disable')
  const makeInsertMembership = require('../repo/membership/insert')
  const makeAthleteRoute = require('../routes/athletes')

  const selectAthletes = makeSelectAthletes(db)

  const editAthlete = makeEditOrCreateAthlete(makeUpdateAthlete, makeDisableMembership, makeInsertMembership, db)
  const createAthlete = makeEditOrCreateAthlete(makeInsertAthlete, makeDisableMembership, makeInsertMembership, db)

  return makeAthleteRoute(selectAthletes, editAthlete, createAthlete)
}

module.exports = makeAthletes