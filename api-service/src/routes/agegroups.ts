import { IRouter, Router } from 'express'
import { SelectAgeGroups } from 'types/agegroup'

export type MakeAgeGroupsRoute = (
  selectAgeGroups: SelectAgeGroups,
) => IRouter

export const makeAgeGroupsRoute: MakeAgeGroupsRoute = function (selectAgeGroups) {
  const router = Router()

  router.get('/', (_, res, next) => {
    return selectAgeGroups()
      .then(res.json.bind(res))
      .catch(next)
  })

  return router
}
