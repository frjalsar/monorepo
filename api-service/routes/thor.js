const { Router } = require('express')

function makeThorRoute (selectThorEvents, selectThorAchievements, selectMissingRunners) {
  const router = Router()

  router.get('/events', (req, res, next) => {
    selectThorEvents(req.query)
      .then(res.json.bind(res))
      .catch(next)
  })

  router.get('/achievements', (req, res, next) => {
    selectThorAchievements(req.query)
      .then(res.json.bind(res))
      .catch(next)
  })

  router.get('/missingrunners', (_, res, next) => {
    selectMissingRunners()
      .then(res.json.bind(res))
      .catch(next)
  })

  selectMissingRunners

  return router
}

module.exports = makeThorRoute
