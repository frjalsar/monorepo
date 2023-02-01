import { IRouter, Router } from 'express'
import { authorize } from '../lib/authorizeHandler'
import { InsertRegion, SelectRegions, UpdateRegion } from 'types/region'

export type MakeRegionsRouter = (
  selectRegions: SelectRegions,
  updateRegion: UpdateRegion,
  insertRegion: InsertRegion
) => IRouter

export const makeRegionsRouter: MakeRegionsRouter = function (selectRegions, updateRegion, insertRegion) {
  const router = Router()

  router.get('/', (_, res, next) => {
    return selectRegions()
      .then(res.json.bind(res))
      .catch(next)
  })

  router.get('/:id', (req, res, next) => {
    return selectRegions({ id: req.params.id })
      .then(res.json.bind(res))
      .catch(next)
  })

  router.put('/', authorize(['admin']), (req, res, next) => {
    return updateRegion(req.body, req.user)
      .then(res.json.bind(res))
      .catch(next)
  })

  router.post('/', authorize(['admin']), (req, res, next) => {
    return insertRegion(req.body, req.user)
      .then(res.json.bind(res))
      .catch(next)
  })

  return router
}
