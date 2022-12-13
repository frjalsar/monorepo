function makeEquipment(db) {
  const makeSelectEquipment = require('../repo/equipment/select')
  const makeUpdateEquipment = require('../repo/equipment/update')
  const makeInsertEquipment = require('../repo/equipment/insert')
  const makeEquipmentRouter = require('../routes/equipment')

  const selectEquipment = makeSelectEquipment(db)
  const insertEquipment = makeInsertEquipment(db)
  const updateEquipment = makeUpdateEquipment(db)

  return makeEquipmentRouter(selectEquipment, updateEquipment, insertEquipment)
}

module.exports = makeEquipment
