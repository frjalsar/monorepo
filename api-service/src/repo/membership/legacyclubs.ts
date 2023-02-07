import { PoolClient } from 'pg'
import {SelectLegacyClubs} from 'types/membership'

export type MakeSelectLegacyClubs = (db: PoolClient) => SelectLegacyClubs

export const makeSelectLegacyClubs:MakeSelectLegacyClubs=function (db) {
  return function selectLegacyClubs () {
    const sql = `
      SELECT DISTINCT
        legacyclub
      FROM
        membership
      ORDER BY
        legacyclub ASC`

    return db
      .query(sql)
      .then(res => res.rows.map(row => row.legacyclub))
  }
}

