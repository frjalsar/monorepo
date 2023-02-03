const { Router } = require('express')
import {authorize} from '../lib/authorizeHandler'

function makeEventsRoute (selectEvents, updateEvent, insertEvent) {
  const router = Router()

  router.get('/', (req, res, next) => {
    return selectEvents(req.query)
      .then(res.json.bind(res))
      .catch(next)
  })

  router.put('/', authorize(['admin']), (req, res, next) => {
    return updateEvent(req.body, req.user)
      .then(res.json.bind(res))
      .catch(next)
  })

  router.post('/', authorize(['admin']), (req, res, next) => {
    return insertEvent(req.body, req.user)
      .then(res.json.bind(res))
      .catch(next)
  })

  return router
}

module.exports = makeEventsRoute