const { Router } = require('express')
const authorize = require('../lib/authorizeHandler')

function makeMeetsRoute (selectMeets, updateMeet, insertMeet) {
  const router = Router()

  router.get('/', (req, res, next) => {
    selectMeets(req.query)
      .then(res.json.bind(res))
      .catch(next)
  })

  router.put('/', authorize(['admin', 'application']), (req, res, next) => {
    return updateMeet(req.body, req.user)
      .then(res.json.bind(res))
      .catch(next)
  })

  router.post('/', authorize(['admin', 'application']), (req, res, next) => {
    return insertMeet(req.body, req.user)
      .then(res.json.bind(res))
      .catch(next)
  })

  return router
}

module.exports = makeMeetsRoute
