const express = require('express')
const hasAccess = require('../auth/hasAccess')
const makeSelectRegions = require('../lib/regions/select')
const makeUpdateRegion = require('../lib/regions/update')
const mapRegions = require('../lib/regions/map')

function makeRegionsRoute (db) {
  const router = express.Router()

  router.get('/', (req, res, next) => {
    const selectRegions = makeSelectRegions(db)

    return selectRegions()
      .then(mapRegions)
      .then(res.json.bind(res))
      .catch(next)
  })

  router.get('/:id', (req, res, next) => {
    const selectRegions = makeSelectRegions(db)

    return selectRegions({ id: req.params.id })
      .then(mapRegions)
      .then(res.json.bind(res))
      .catch(next)
  })

  router.put('/', hasAccess('regionId'), (req, res, next) => {
    const updateRegion = makeUpdateRegion(db)

    return updateRegion(req.body, req.user)
      .then(res.json.bind(res))
      .catch(next)
  })

  return router
}

module.exports = makeRegionsRoute
