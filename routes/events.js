const express = require('express')
const makeSelectEvents = require('../lib/events/select')

function makeEventsRoute (db) {
  const router = express.Router()
  const selectEvents = makeSelectEvents(db)  

  router.get('/', (_, res, next) => {
    return selectEvents()
      .then(res.json.bind(res))
      .catch(next)
  })

  return router
}


module.exports = makeEventsRoute
