const express = require('express')
const makeSelectThorEvents = require('../lib/thor/events')

function makeThorRoute (sqlConnection) {
  const router = express.Router()

  router.get('/events', (req, res, next) => {
    const selectThorEvents = makeSelectThorEvents(sqlConnection)

    selectThorEvents(req.query)
      .then(res.json.bind(res))
      .catch(next)
  })

  return router
}

module.exports = makeThorRoute
