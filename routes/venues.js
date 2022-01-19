const { Router } = require('express')
const mapVenues = require('../repo/venues/map')

function makeVenuesRoute (selectVenues, updateVenue) {
  const router = new Router()

  router.get('/:id?', (req, res, next) => {
    return selectVenues(req.params)
      .then(mapVenues)
      .then(res.json.bind(res))
      .catch(next)
  })

  router.put('/', (req, res, next) => {
    return updateVenue(req.body)
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
