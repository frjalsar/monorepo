const { Router } = require('express')

function makeEventsRoute (selectEvents) {
  const router = Router()

  router.get('/', (_, res, next) => {
    return selectEvents()
      .then(res.json.bind(res))
      .catch(next)
  })

  return router
}

module.exports = makeEventsRoute
