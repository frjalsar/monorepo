const { Router } = require('express')
const authorize = require('../lib/authorizeHandler')

function makeEquipmentRoute (selectEquipment, updateEquipment, insertEquipment) {
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

module.exports = makeEquipmentRoute
