const express = require('express')
const makeSelectRegions = require('../lib/regions/select')
const makeUpdateRegion = require('../lib/regions/update')

function makeRegionsRoute (db) {
  const router = express.Router()

  router.get('/', (req, res, next) => {
    const selectRegions = makeSelectRegions(db)

    return selectRegions()
      .then(res.json.bind(res))
      .catch(next)
  })

  router.get('/:id', (req, res, next) => {
    const selectRegions = makeSelectRegions(db)

    return selectRegions({ id: req.params.id })
      .then(res.json.bind(res))
      .catch(next)
  })

  router.put('/', (req, res, next) => {
    const updateRegion = makeUpdateRegion(db)

    return updateRegion(req.body)
      .then(res.json.bind(res))
      .catch(next)
  })

  return router
}

module.exports = makeRegionsRoute
