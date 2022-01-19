function makeAthletes (db) {
  const makeSelectAthletes = require('../repo/athletes/select')
  const makeInsertAthlete = require('../repo/athletes/insert')
  const makeUpdateAthlete = require('../repo/athletes/update')
  const makeEditOrCreateAthlete = require('../repo/athletes/editOrCreate')
  const makeDisableMembership = require('../repo/membership/disable')
  const makeInsertMembership = require('../repo/membership/insert')
  const makeAthleteRoute = require('../routes/athletes')

  const selectAthletes = makeSelectAthletes(db)

  const editAthlete = makeEditOrCreateAthlete(makeUpdateAthlete, makeDisableMembership, makeInsertMembership)
  const createAthlete = makeEditOrCreateAthlete(makeInsertAthlete, makeDisableMembership, makeInsertMembership)

  return makeAthleteRoute(selectAthletes, editAthlete, createAthlete)
}

module.exports = makeAthletes