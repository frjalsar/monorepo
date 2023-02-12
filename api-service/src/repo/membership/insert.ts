import { flatten, toTuple } from 'pg-parameterize'
import { PoolClient } from 'pg'
import { InsertMembership } from 'types/membership'

export type MakeInsertMembership = (db: PoolClient) => InsertMembership

export const makeInsertMembership:MakeInsertMembership = function (db) {
  return function insertMembership (membership, user) {
    if (membership.length === 0) {
      return Promise.resolve()
    }

    const arr = membership.map(obj => [
      obj.athleteId,
      obj.clubId,
      obj.yearFrom,
      obj.yearTo,
      obj.legacyClub,
      obj.confirmed,
      user.id
    ])

    const sql = `
      INSERT INTO membership(
        athleteid,
        clubid,
        yearfrom,
        yearto,
        legacyclub,
        confirmed,
        _userid
      )
      VALUES ` + toTuple(arr, true)

    const params = flatten(arr)

    return db.query(sql, params)
  }
}
