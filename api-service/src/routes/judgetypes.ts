import { IRouter, Router } from 'express'
import { authorize } from '../lib/authorizeHandler'
import { UpdateJudgeType, SelectJudgeTypes, InsertJudgeType } from 'types/judgetype'

export type MakeJudgeTypesRouter = (
  selectJudgeTypes: SelectJudgeTypes,
  updateJudgeType: UpdateJudgeType,
  insertJudgeType: InsertJudgeType
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
