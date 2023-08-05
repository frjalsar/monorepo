import { PoolClient } from 'pg'
import { UpdateRegistrations } from 'types/registration'

export type MakeUpdateRegistrations = (db: PoolClient) => UpdateRegistrations

export const makeUpdateRegistrations: MakeUpdateRegistrations = function (db) {
  return function updateRegistrations (id, registration) {
    const sql = `
      UPDATE registrations SET 
      competitionid = $1, 
      athleteid = $2, 
      note = $3      
      WHERE id = $4 RETURNING id`

    const params = [
      registration.competitionId,
      registration.athleteId,
      registration.note,
      id
    ]

    return db
      .query(sql, params)
      .then(res => res.rows[0].id)
  }
}
