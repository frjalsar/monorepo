

import { IRouter, Router } from 'express'
import { authorize } from '../lib/authorizeHandler'
import { insertJudge, selectJudges, updateJudge } from 'types/judges'

export type MakeRegionsRouter = (
  selectJudges: selectJudges,
  updateJudge: updateJudge,
  insertJudge: insertJudge
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