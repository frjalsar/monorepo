const { Router } = require('express')

function makeVenuesRoute (selectVenues, updateVenue) {
  const router = new Router()

  router.get('/:id?', (req, res, next) => {
    return selectVenues(req.params)
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
