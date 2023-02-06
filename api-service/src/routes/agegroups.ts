import { Router } from 'express'

export const makeAgeGroupsRoute = function (selectAgeGroups) {
  const router = Router()

  router.get('/', (_, res, next) => {
    return selectAgeGroups()
      .then(res.json.bind(res))
      .catch(next)
  })

  return router
}
