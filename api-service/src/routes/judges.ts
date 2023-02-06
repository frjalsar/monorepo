

import { IRouter, Router } from 'express'
import { authorize } from '../lib/authorizeHandler'
import { InsertJudge, SelectJudges, UpdateJudge } from 'types/judges'

export type MakeRegionsRouter = (
  selectJudges: SelectJudges,
  updateJudge: UpdateJudge,
  insertJudge: InsertJudge
) => IRouter


export const makeJudgesRouter: MakeRegionsRouter = function (selectJudges, updateJudge, insertJudge) {
  const router = Router()

  router.get('/:id?', (req, res, next) => {
    return selectJudges({ id: req.params.id })
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