import { Router, IRouter } from 'express'
import { authorize } from '../lib/authorizeHandler'
import { DeleteRegistrations, InsertRegistrations, SelectRegistrations, UpdateRegistrations } from 'types/registration'

export type MakeRegistrationsRoute = (
  selectRegistrations: SelectRegistrations,
  insertRegistrations: InsertRegistrations,
  updateRegistrations: UpdateRegistrations,
  deleteRegistrations: DeleteRegistrations
) => IRouter

export const makeRegistrationsRoute: MakeRegistrationsRoute = function (selectRegistrations, insertRegistrations, updateRegistrations, deleteRegistrations) {
  const router = Router()

  router.get('/', (req, res, next) => {
    selectRegistrations(req.query)
      .then(res.json.bind(res))
      .catch(next)
  })

  router.get('/:id', (req, res, next) => {
    selectRegistrations(req.params)
      .then(res.json.bind(res))
      .catch(next)
  })
  router.post('/', (req, res, next) => {
    insertRegistrations(req.body)
      .then(res.json.bind(res))
      .catch(next)
  })
  router.put('/:id', authorize(['admin']), (req, res, next) => {
    updateRegistrations(req.params.id, req.body)
      .then(res.json.bind(res))
      .catch(next)
  })
  router.delete('/:id', authorize(['admin']), (req, res, next) => {
    deleteRegistrations(req.params.id)
      .then(res.json.bind(res))
      .catch(next)
  })

  return router
}
