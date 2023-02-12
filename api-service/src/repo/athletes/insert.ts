import { PoolClient } from 'pg'
import { InsertAthlete } from 'types/athlete'

export type MakeInsertAthlete = (db: PoolClient) => InsertAthlete

export const makeInsertAthlete:MakeInsertAthlete = function (db) {
  return function insertAthlete (athlete, user) {
    const sql = `
        INSERT INTO athletes (
          fullname,
          kt,
          birthyear,
          gender,
          country,
          thorid,
          _userid,
          _enabled,
          _time
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, true, CURRENT_TIMESTAMP(3))
        RETURNING id
      `

    const params = [
      athlete.fullName,
      athlete.kt,
      athlete.birthyear,
      athlete.gender,
      athlete.country,
      athlete.thorId,
      user.id
    ]

    return db
      .query(sql, params)
      .then(res => res.rows[0].id)
  }
}
