const express = require('express')
const mapVenues = require('../lib/venues/map')
const makeSelectVenues = require('../lib/venues/select')
const makeUpdateVenue = require('../lib/venues/update')

function makeVenuesRoute (db) {
  const router = express.Router()
  const selectVenues = makeSelectVenues(db)
  const updateVenues = makeUpdateVenue(db)

  router.get('/:id?', (req, res, next) => {
    return selectVenues(req.params)
      .then(mapVenues)
      .then(res.json.bind(res))
      .catch(next)
  })

  router.put('/', hasAccess(), (req, res, next) => {
    return updateVenues(req.body)
      .then(res.json.bind(res))
      .catch(next)
  })

  return router
}

function hasAccess () {
  return (req, res, next) => {
    if (req.user && req.user.admin) {
      return next()
    }

    return res.sendStatus(401)
  }
}

module.exports = makeVenuesRoute
