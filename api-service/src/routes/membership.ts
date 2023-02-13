import { Router, IRouter } from 'express'
import { SelectLegacyClubs } from 'types/membership'

export type MakeMembershipRoute = (
  selectLegacyClubs: SelectLegacyClubs
) => IRouter

export const makeMembershipRouter: MakeMembershipRoute = function (selectLegacyClubs) {
  const router = Router()

  router.get('/legacy', (req, res, next) => {
    selectLegacyClubs()
      .then(res.json.bind(res))
      .catch(next)
  })

  return router
}
