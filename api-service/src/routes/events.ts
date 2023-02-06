import { authorize } from '../lib/authorizeHandler'
import { IRouter, Router } from 'express'
import { InsertEvent, SelectEvents, UpdateEvent } from 'types/events'

export type MakeEventsRouter = (
  selectEvents:SelectEvents,
  updateEvent: UpdateEvent,
  insertEvent: InsertEvent
) => IRouter

export const makeEventsRouter:MakeEventsRouter= function (selectEvents, updateEvent, insertEvent) {
  const router = Router()

  router.get('/', (req, res, next) => {
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

