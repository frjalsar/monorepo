const { Router } = require('express')

function makeMembershipRoute (selectLegacyClubs) {
  const router = Router()

  router.get('/legacy', (req, res, next) => {
    selectLegacyClubs()
      .then(res.json.bind(res))
      .catch(next)
  })

  return router
}

module.exports = makeMembershipRoute
