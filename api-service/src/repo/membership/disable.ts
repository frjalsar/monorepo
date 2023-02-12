import { PoolClient } from 'pg'
import { DisabledMembership } from 'types/membership'

export type MakeDisableMembership = (db: PoolClient) => DisabledMembership

export const makeDisableMembership:MakeDisableMembership = function (db) {
  return function updateMembership (athleteId) {
    const sql = `
      UPDATE
        membership
      SET
        _enabled = false
      WHERE
        athleteid = $1`

    const params = [athleteId]

    return db.query(sql, params)
  }
}
