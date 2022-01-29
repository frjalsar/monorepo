const { Router } = require('express')
const authorize = require('../lib/authorizeHandler')

function makeCompetitionsRoute (selectCompetitions, insertCompetition) {
  const router = Router()

  router.get('/', (req, res, next) => {
    selectCompetitions()
      .then(res.json.bind(res))
      .catch(next)
  })

  router.get('/:id', (req, res, next) => {
    selectCompetitions({ meetId: req.params.id })
      .then(res.json.bind(res))
      .catch(next)
  })

  router.put('/', authorize(['admin']), (req, res, next) => {
    return updateCompetitions(req.body, req.user)
      .then(res.json.bind(res))
      .catch(next)
  })

  router.post('/', authorize(['admin']), (req, res, next) => {
    return insertCompetition(req.body, req.user)
      .then(res.json.bind(res))
      .catch(next)
  })

  return router
}

module.exports = makeCompetitionsRoute
