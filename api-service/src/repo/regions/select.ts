
import { PoolClient } from 'pg'
import { SelectRegions } from 'types/region'
import { mapToRegion } from './map'

export type MakeSelectRegions = (db: PoolClient) => SelectRegions

export const makeSelectRegions: MakeSelectRegions = function (db) {
  return function selectRegions (opt) {
    const params: Array<number | string> = []

    let sql = `
      SELECT
        r.id region_id,
        r.abbreviation region_abbreviation,
        r.fullname region_fullname
      FROM
        regions r
      WHERE 1 = 1`

    if (opt && opt.id) {
      sql += 'AND r.id = $1'
      params.push(opt.id)
    }

    sql += ' ORDER BY r.fullname asc'

    return db
      .query(sql, params)
      .then(res => res.rows.map(mapToRegion))
  }
}
