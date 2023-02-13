
import { createQrCode } from './createQrCode'
import { uuidv4 } from 'uuid'
import { PoolClient } from 'pg'
import { InsertPass } from 'types/pass'

export type MakeInsertPass = (db: PoolClient) => InsertPass

export const makeInsertPass: MakeInsertPass = function (db) {
  return function insertPass (athleteId) {
    const id = uuidv4()
    const sql = `
      INSERT INTO passes (
        id,
        athleteid,
        qr,
        created,
        expires
      )
      VALUES ($1, $2, $3, CURRENT_DATE, CURRENT_DATE + interval '1 year')    
      RETURNING id`

    return createQrCode(id).then(buffer => {
      const params = [id, athleteId, buffer]

      return db
        .query(sql, params)
        .then(res => res.rows[0].id)
    })
  }
}
