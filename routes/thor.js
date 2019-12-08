const express = require('express')
const makeSelectThorEvents = require('../lib/thor/events')
const makeSelectThorAchievements = require('../lib/thor/achievements')

function makeThorRoute (sqlConnection) {
  const router = express.Router()
  const selectThorEvents = makeSelectThorEvents(sqlConnection)
  const selectThorAchievements = makeSelectThorAchievements(sqlConnection)

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

  return router
}

module.exports = makeThorRoute
