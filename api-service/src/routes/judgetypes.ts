import { IRouter, Router } from 'express'
import { authorize } from '../lib/authorizeHandler'
import { updateJudgeType, selectJudgeTypes, insertJudgeType } from 'types/JudgeType'

export type MakeJudgeTypesRouter = (
  selectJudgeTypes: selectJudgeTypes,
  updateJudgeType: updateJudgeType,
  insertJudgeType: insertJudgeType
) => IRouter

export const makeJudgeTypesRouter: MakeJudgeTypesRouter = function(selectJudgeTypes, updateJudgeType, insertJudgeType) {
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
