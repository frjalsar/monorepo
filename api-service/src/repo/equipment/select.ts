import { mapEquipment } from './map'
import { PoolClient } from 'pg'
import { SelectEquipment } from 'types/equipment'

export type MakeSelectEquipment = (db: PoolClient) => SelectEquipment

export const makeSelectEquipment: MakeSelectEquipment = function (db) {
  return function selectEqiupment (opt) {
    const params:Array<number|string> = []
    let sql = `
      SELECT
        eq.id,
        eq.eventid,
        eq.gender,
        eq.age,
        eq.value,
        eq.unit,
        ev.name eventname
      FROM equipment eq
      LEFT JOIN
        events ev ON ev.id = eq.eventid`

    if (opt && opt.id) {
      sql += ' WHERE eq.id = $1'
      params.push(opt.id)
    }

    sql += ' ORDER BY ev.name ASC, eq.age ASC, eq.gender ASC'

    return db
      .query(sql, params)
      .then(res => res.rows.map(mapEquipment))
  }
}
