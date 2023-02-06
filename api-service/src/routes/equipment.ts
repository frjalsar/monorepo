import { Router, IRouter } from 'express'
import { authorize } from '../lib/authorizeHandler'
import { SelectEquipment, InsertEquipment, UpdateEquipment } from 'types/equipment'

export type MakeEquipmentRoute = (
  selectEquipment: SelectEquipment,
  updateEquipment: UpdateEquipment,
  insertEquipment: InsertEquipment
) => IRouter

export const makeEquipmentRouter: MakeEquipmentRoute = function (selectEquipment, updateEquipment, insertEquipment) {
  const router = Router()

  router.get('/', (req, res, next) => {
    selectEquipment()
      .then(res.json.bind(res))
      .catch(next)
  })

  router.get('/:id', (req, res, next) => {
    selectEquipment({ id: req.params.id })
      .then(res.json.bind(res))
      .catch(next)
  })

  router.put('/', authorize(['admin']), (req, res, next) => {
    return updateEquipment(req.body, req.user)
      .then(res.json.bind(res))
      .catch(next)
  })

  router.post('/', authorize(['admin']), (req, res, next) => {
    return insertEquipment(req.body, req.user)
      .then(res.json.bind(res))
      .catch(next)
  })

  return router
}

