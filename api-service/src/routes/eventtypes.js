const { Router } = require('express')
const { authorize } = require('../lib/authorizeHandler')

function makeEventTypesRoute (selectEventTypes, updateEventType, insertEventType) {
  const router = Router()

  router.get('/', (_, res, next) => {
    return selectEventTypes()
      .then(res.json.bind(res))
      .catch(next)
  })

  router.put('/', authorize(['admin']), (req, res, next) => {
    return updateEventType(req.body, req.user)
      .then(res.json.bind(res))
      .catch(next)
  })

  router.post('/', authorize(['admin']), (req, res, next) => {
    return insertEventType(req.body, req.user)
      .then(res.json.bind(res))
      .catch(next)
  })

  return router
}

module.exports = makeEventTypesRoute
