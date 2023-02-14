import { toOrdinal } from 'pg-parameterize'
import { PoolClient } from 'pg'
import { SelectPasses } from 'types/pass'

export type MakeSelectPasses = (db: PoolClient) => SelectPasses

export const makeSelectPasses: MakeSelectPasses = function (db) {
  return function selectPasses (options) {
    const opt = options || {}
    const params = []

    let sql = `
      SELECT
        p.id,
        p.athleteid,
        p.qr,
        p.created,
        p.expires,
        a.fullname
      FROM passes p
      JOIN athletes a
      ON p.athleteId = a.id
      WHERE athleteid = 1 = 1
    `
    if (opt.athleteId) {
      sql += ' AND p.athleteId = ?'
    }

    return db
      .query(toOrdinal(sql), params)
      .then(res => res.rows[0])
  }
}
