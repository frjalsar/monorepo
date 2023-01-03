const { Router } = require('express')

function makeThorRoute (selectThorEvents, selectThorAchievements, selectMissingRunners, selectCompetitor) {
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

  router.get('/competitor/:kt', (req, res, next) => {
    selectCompetitor({ kt: req.params.kt })
      .then(res.json.bind(res))
      .catch(next)
  })
  return router
}

module.exports = makeThorRoute
