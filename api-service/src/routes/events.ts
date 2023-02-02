import { IRouter, Router } from 'express'
import { insertEvent, selectEvents, updateEvent } from 'types/event'
import { authorize } from '../lib/authorizeHandler'

export type MakeEventsRoute = (
  selectEvents: selectEvents,
  updateEvent: updateEvent,
  insertEvent: insertEvent
) => IRouter

export const makeEventsRouter:MakeEventsRoute=function (selectEvents, updateEvent, insertEvent) {
  const router = Router()

  router.get('/', (_,req, res, next) => {
    return selectEvents(req.query)
      .then(res.json.bind(res))
      .catch(next)
  })

  router.put('/', authorize(['admin']), (req, res, next) => {
    return updateEvent(req.body, req.user)
      .then(res.json.bind(res))
      .catch(next)
  })

  router.post('/', authorize(['admin']), (req, res, next) => {
    return insertEvent(req.body, req.user)
      .then(res.json.bind(res))
      .catch(next)
  })

  return router
}


