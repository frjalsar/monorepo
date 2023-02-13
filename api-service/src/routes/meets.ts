import { Router, IRouter } from 'express'
import { authorize } from '../lib/authorizeHandler'
import { SelectMeets, SelectMeetAttachment, UpdateMeet, CreateMeet } from 'types/meet'

export type MakeMeetsRoute = (
  selectMeets: SelectMeets,
  selectMeetAttachment: SelectMeetAttachment,
  updateMeet: UpdateMeet,
  createMeet: CreateMeet
) => IRouter

export const makeMeetsRouter: MakeMeetsRoute = function (selectMeets, selectMeetAttachment, updateMeet, createMeet) {
  const router = Router()

  router.get('/', (req, res, next) => {
    selectMeets(req.query)
      .then(res.json.bind(res))
      .catch(next)
  })

  router.get('/:id/file', (req, res, next) => {
    const meetId = req.params.id
    res.setHeader('Content-disposition', 'attachment; filename=bodsbref-' + meetId + '.docx')

    selectMeetAttachment(req.params.id)
      .then(attachment => {
        if (!attachment) {
          return res.sendStatus(404)
        }

        return res.send(attachment)
      })
      .catch(next)
  })

  router.put('/', authorize(['admin', 'application']), (req, res, next) => {
    return updateMeet(req.body, req.user)
      .then(res.json.bind(res))
      .catch(next)
  })

  router.post('/', authorize(['admin', 'application']), (req, res, next) => {
    return createMeet(req.body, req.user)
      .then(res.json.bind(res))
      .catch(next)
  })

  return router
}
