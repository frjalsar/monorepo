const express = require('express')
const makeSelectLegacyClubs = require('../lib/membership/legacyclubs')

function makeMembershipRoute (db) {
  const router = express.Router()

  router.get('/legacy', (req, res, next) => {
    const selectClubs = makeSelectLegacyClubs(db)

    selectClubs()
      .then(res.json.bind(res))
      .catch(next)
  })

  return router
}

module.exports = makeMembershipRoute
