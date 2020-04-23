const express = require('express')
const mapJudges = require('../lib/judges/map')
const makeSelectJudges = require('../lib/judges/select')
const makeUpdateJudge = require('../lib/judges/update')

function makeJudgesRoute (db) {
  const router = express.Router()
  const selectJudges = makeSelectJudges(db)
  const updateJudge = makeUpdateJudge(db)

  router.get('/:id?', (req, res, next) => {
    return selectJudges(req.params)
      .then(mapJudges)
      .then(res.json.bind(res))
      .catch(next)
  })

  router.put('/', hasAccess(), (req, res, next) => {
    return updateJudge(req.body)
      .then(res.json.bind(res))
      .catch(next)
  })

  return router
}

function hasAccess () {
  return (req, res, next) => {
    if (req.user && req.user.admin) {
      return next()
    }

    return res.sendStatus(401)
  }
}

module.exports = makeJudgesRoute
