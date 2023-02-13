import { makeSelectEquipment } from '../repo/equipment/select'
import { makeUpdateEquipment } from '../repo/equipment/update'
import { makeInsertEquipment } from '../repo/equipment/insert'
import { makeEquipmentRouter } from '../routes/equipment'
import { PoolClient } from 'pg'
import { IRouter } from 'express'
import { SelectEquipment, InsertEquipment, UpdateEquipment } from 'types/equipment'

export type MakeEquipment = (db: PoolClient) => IRouter

export function makeEquipment (db) {
  const selectEquipment: SelectEquipment = makeSelectEquipment(db)
  const insertEquipment: InsertEquipment = makeInsertEquipment(db)
  const updateEquipment: UpdateEquipment = makeUpdateEquipment(db)

  return makeEquipmentRouter(selectEquipment, insertEquipment, updateEquipment)
}
