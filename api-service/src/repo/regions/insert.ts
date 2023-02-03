import { PoolClient } from 'pg'
import { InsertRegion } from 'types/region'

export type MakeInsertRegion = (db: PoolClient) => InsertRegion

export const makeInsertRegion: MakeInsertRegion = function (db) {
  return function insertRegion (region, user) {
    const sql = `
      INSERT INTO regions (
        fullname,
        abbreviation,
        _userid,
        _enabled,
        _time
      )
      VALUES ($1, $2, $3, true, CURRENT_TIMESTAMP(3))`

    const params= [
      region.fullName,
      region.abbreviation,
      user.id
    ]

    return db
      .query(sql, params)
      .then(res => res.rowCount)
  }
}
