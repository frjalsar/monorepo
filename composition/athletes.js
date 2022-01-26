function makeAthletes (pgPool, sqlConnection) {
  const makeSelectAthletes = require('../repo/athletes/select')
  const makeUpdateAthlete = require('../repo/athletes/update')
  const makeInsertAthlete = require('../repo/athletes/insert')
  const makeEditAthlete = require('../repo/athletes/edit')
  const makeCreateAthlete = require('../repo/athletes/create')
  const makeSelectClubs = require('../repo/clubs/select')
  const makeDisableMembership = require('../repo/membership/disable')
  const makeInsertMembership = require('../repo/membership/insert')
  const makeAthleteRoute = require('../routes/athletes')

  // THOR - Remove in future
  const makeUpdateCompetitor = require('../repo/thor/updateCompetitor')
  const makeInsertCompetitor = require('../repo/thor/insertCompetitor')
  const updateCompetitor = makeUpdateCompetitor(sqlConnection)
  const insertCompetitor = makeInsertCompetitor(sqlConnection)

  const selectAthletes = makeSelectAthletes(pgPool)
  const editAthlete = makeEditAthlete(makeUpdateAthlete, makeSelectClubs, makeDisableMembership, makeInsertMembership, pgPool, updateCompetitor)
  const createAthlete = makeCreateAthlete(makeInsertAthlete, makeSelectClubs, makeInsertMembership, pgPool, insertCompetitor)

  return makeAthleteRoute(selectAthletes, editAthlete, createAthlete)
}

module.exports = makeAthletes
