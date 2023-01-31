const express = require('express')

const makeSelectPasses = require('../lib/passes/select')
const makeInsertPass = require('../lib/passes/insert')

function makePassesRoute (db) {
  const router = express.Router()

  router.get('/:athleteId', (req, res, next) => {
    const selectPasses = makeSelectPasses(db)

    return selectPasses(req.params)
      .then(res.json.bind(res))
      .catch(next)
  })

  router.post('/', (req, res, next) => {
    const insertPass = makeInsertPass(db)

    return insertPass(req.body)
      .then(res.json.bind(res))
      .catch(next)
  })

  return router
}

module.exports = makePassesRoute
