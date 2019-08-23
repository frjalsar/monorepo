const express = require('express')
const makeSelectRegions = require('../lib/regions/select')

function makeRegionsRoute (db) {
  const router = express.Router()

  router.get('/', (req, res, next) => {
    const selectRegions = makeSelectRegions(db)

    return selectRegions()
      .then(res.json.bind(res))
      .catch(next)
  })

  return router
}

module.exports = makeRegionsRoute
