import { PoolClient } from 'pg'
import { InsertRegistrations } from 'types/registration'

export type MakeInsertRegistrations = (db: PoolClient) => InsertRegistrations

export const makeInsertRegistrations: MakeInsertRegistrations = function (db) {
  return function insertRegistrations (registration) {
    const sql = `
      INSERT INTO registrations (
        competitionid,
        athleteid,
        note       
      )
      VALUES ($1, $2, $3) RETURNING id`

    const params = [
      registration.competitionId,
      registration.athleteId,
      registration.note
    ]

    return db
      .query(sql, params)
      .then(res => res.rows[0].id)
  }
}
