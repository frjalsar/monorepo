const { Router } = require('express')
const authorize = require('../lib/authorizeHandler')

function makeVenuesRoute (selectVenues, updateVenue, insertVenue) {
  const router = new Router()

  router.get('/:id?', (req, res, next) => {
    return selectVenues(req.params)
      .then(res.json.bind(res))
      .catch(next)
  })

  router.put('/', authorize(['admin']), (req, res, next) => {
    return updateVenue(req.body, req.user)
      .then(res.json.bind(res))
      .catch(next)
  })

  router.post('/', authorize(['admin']), (req, res, next) => {
    return insertVenue(req.body, req.user)
      .then(res.json.bind(res))
      .catch(next)
  })

  return router
}

/*
function hasAccess () {
  return (req, res, next) => {
    if (req.user && req.user.admin) {
      return next()
    }

    return res.sendStatus(401)
  }
}
*/

module.exports = makeVenuesRoute
