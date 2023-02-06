
import { PoolClient } from 'pg'
import { InsertEquipment } from 'types/equipment'

export type MakeInsertEquipment = (db: PoolClient) => InsertEquipment

export const makeInsertEquipment:MakeInsertEquipment = function(db) {
  return function insertEquipment(equipment, user) {
    const sql = `
      INSERT INTO equipment (
        eventid,
        gender,
        age,
        value,
        unit,        
        _userid,
        _enabled,
        _time
      )
      VALUES ($1, $2, $3, $4, $5, $6, true, CURRENT_TIMESTAMP(3))
      RETURNING id`

    const params = [
      equipment.eventId,
      equipment.gender,
      equipment.age,
      equipment.value,
      equipment.unit,
      user.id
    ]

    return db
      .query(sql, params)
      .then(res => res.rows[0].id)
  }
}