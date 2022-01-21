function makeMembership (db) {
  const makeSelectLegacyClubs = require('../repo/membership/legacyclubs')
  const makeMembershipRouter = require('../routes/membership')

  const selectLegacyClubs = makeSelectLegacyClubs(db)

  return makeMembershipRouter(selectLegacyClubs)
}

module.exports = makeMembership
