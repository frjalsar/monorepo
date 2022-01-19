const { Router } = require('express')
const mapJudges = require('../repo/judges/map')

function makeJudgesRoute (selectJudges, updateJudge) {
  const router = Router()  

  router.get('/:id?', (req, res, next) => {
    return selectJudges(req.params)
      .then(mapJudges)
      .then(res.json.bind(res))
      .catch(next)
  })

  router.put('/', (req, res, next) => {
    return updateJudge(req.body)
      .then(res.json.bind(res))
      .catch(next)
  })

  return router
}

module.exports = makeJudgesRoute
