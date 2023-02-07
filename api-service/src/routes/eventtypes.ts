import { IRouter, Router } from 'express'
import { InsertEventType,SelectEventTypes, UpdateEventType } from 'types/eventtype'
import { authorize } from '../lib/authorizeHandler'

export type MakeEventTypesRoute = (
  selectEventTypess:SelectEventTypes,
  updateEventType: UpdateEventType,
  insertEventType: InsertEventType
) => IRouter

export const makeEventTypesRouter:MakeEventTypesRoute=function (selectEventTypes, updateEventType, insertEventType) {
  const router = Router()

  router.get('/', (_, res, next) => {
    return selectEventTypes()
      .then(res.json.bind(res))
      .catch(next)
  })

  router.put('/', authorize(['admin']), (req, res, next) => {
    return updateEventType(req.body, req.user)
      .then(res.json.bind(res))
      .catch(next)
  })

  router.post('/', authorize(['admin']), (req, res, next) => {
    return insertEventType(req.body, req.user)
      .then(res.json.bind(res))
      .catch(next)
  })

  return router
}

