const express = require('express')
const makeSelectVenues = require('../lib/venues/select')

function makeVenuesRoute (db) {
  const router = express.Router()
  const selectVenues = makeSelectVenues(db)

  router.get('/', (_, res, next) => {
    return selectVenues()
      .then(res.json.bind(res))
      .catch(next)
  })

  return router
}

module.exports = makeVenuesRoute
