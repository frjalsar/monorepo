const { Router } = require('express')
const authorize = require('../lib/authorizeHandler')

function makeJudgesRoute (selectJudges, updateJudge, insertJudge) {
  const router = Router()

  router.get('/:id?', (req, res, next) => {
    return selectJudges(req.params)
      .then(res.json.bind(res))
      .catch(next)
  })

  router.put('/', authorize(['admin']), (req, res, next) => {
    return updateJudge(req.body, req.user)
      .then(res.json.bind(res))
      .catch(next)
  })

  router.post('/', authorize(['admin']), (req, res, next) => {
    return insertJudge(req.body, req.user)
      .then(res.json.bind(res))
      .catch(next)
  })

  return router
}

module.exports = makeJudgesRoute
