const { Router } = require('express')
const mapRegions = require('../repo/regions/map')

function makeRegionsRoute (selectRegions, updateRegion, insertRegion) {
  const router = Router()

  router.get('/', (req, res, next) => {
    return selectRegions()
      .then(res.json.bind(res))
      .catch(next)
  })

  router.get('/:id', (req, res, next) => {
    return selectRegions({ id: req.params.id })
      .then(res.json.bind(res))
      .catch(next)
  })

  router.put('/', authorize(['admin']), (req, res, next) => {
    return updateRegion(req.body, req.user)
      .then(res.json.bind(res))
      .catch(next)
  })

  router.post('/', authorize(['admin']), (req, res, next) => {
    return insertRegion(req.body, req.user)
      .then(res.json.bind(res))
      .catch(next)
  })

  return router
}

function hasAccess () {
  return (req, res, next) => {
    if (req.user) {
      if (req.user.admin) {
        return next()
      }

      if (req.user.regionId === req.body.id) {
        return next()
      }
    }

    return res.sendStatus(401)
  }
}

module.exports = makeRegionsRoute
