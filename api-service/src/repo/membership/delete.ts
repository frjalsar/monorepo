import { PoolClient } from 'pg'
import { DeleteMembership } from 'types/membership'

export type MakeDeleteMembership = (db: PoolClient) => DeleteMembership

export const makeDeleteMembership:MakeDeleteMembership = function (db) {
  return function deleteMembership (athleteId) {
    const sql = `
      DELETE FROM
        membership
      WHERE
        athleteid = $1`

    const params = [athleteId]

    return db
      .query(sql, params)
  }
}
