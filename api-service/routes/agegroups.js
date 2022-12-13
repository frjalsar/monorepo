
const { Router } = require('express')

const makeAgeGroupsRoute = function (selectAgeGroups) {
  const router = new Router()

  router.get('/', (_, res, next) => {
    return selectAgeGroups()
      .then(res.json.bind(res))    
      .catch(next)
  })  

  return router
}
module.exports = makeAgeGroupsRoute
