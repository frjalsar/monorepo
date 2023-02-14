import { PoolClient } from 'pg'
import { DeleteRegistrations } from 'types/registration'

export type MakeDeleteRegistrations = (db: PoolClient) => DeleteRegistrations

export const makeDeleteRegistrations: MakeDeleteRegistrations = function (db) {
  return function DeleteRegistrations (id) {
    const sql = `
      DELETE FROM registrations WHERE id = $1 RETURNING id`

    const params = [
      id
    ]

    return db
      .query(sql, params)
      .then(res => res.rows[0].id)
  }
}
