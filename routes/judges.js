const express = require('express')
const makeSelectJudges = require('../lib/judges/select')

function makeJudgesRoute (db) {
  const router = express.Router()
  const selectJudges = makeSelectJudges(db)

  router.get('/', (_, res, next) => {
    return selectJudges()
      .then(res.json.bind(res))
      .catch(next)
  })

  return router
}

module.exports = makeJudgesRoute
