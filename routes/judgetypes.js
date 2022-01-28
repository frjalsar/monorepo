const { Router } = require('express')
const authorize = require('../lib/authorizeHandler')

function makeJudgeTypesRouter (selectJudgeTypes, updateJudgeType, insertJudgeType) {
  const router = Router()

  router.get('/', (_, res, next) => {
    return selectJudgeTypes()
      .then(res.json.bind(res))
      .catch(next)
  })

  router.put('/', authorize(['admin']), (req, res, next) => {
    return updateJudgeType(req.body, req.user)
      .then(res.json.bind(res))
      .catch(next)
  })

  router.post('/', authorize(['admin']), (req, res, next) => {
    return insertJudgeType(req.body, req.user)
      .then(res.json.bind(res))
      .catch(next)
  })

  return router
}

module.exports = makeJudgeTypesRouter
