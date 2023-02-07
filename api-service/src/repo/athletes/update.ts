import { PoolClient } from 'pg'
import { UpdateAthlete } from 'types/athlete'

export type MakeUpdateAthlete = (db: PoolClient) => UpdateAthlete

export const makeUpdateAthlete:MakeUpdateAthlete=function (db) {

  return function updateAthlete (athlete, user) {
    const sql = `
        UPDATE athletes
        SET
          fullname = $1,
          kt = $2,
          birthyear = $3,
          gender = $4,
          country = $5,
          thorid = $6,
          _userid = $7,
          _enabled = true,
          _time = CURRENT_TIMESTAMP(3)
        WHERE id = $8
        RETURNING id`

    const params = [
      athlete.fullName,
      athlete.kt,
      athlete.birthyear,
      athlete.gender,
      athlete.country,
      athlete.thorId,
      user.id,
      athlete.id
    ]

    return db
      .query(sql, params)
      .then(res => res.rows[0].id)
  }
}

