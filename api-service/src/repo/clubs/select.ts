import { PoolClient } from 'pg'
import {selectClubs} from 'types/club'
import { mapToClub } from './map'

export type MakeSelectClubs = (db: PoolClient) => selectClubs
export const makeSelectClubs:MakeSelectClubs=function (db) {
  return function selectClubs (opt) {

    const params: Array<number | string> = []
    let sql = `
      SELECT
        c.id,
        c.fullname,
        c.shortname,
        c.abbreviation,
        c.thorid,
        r.id regionid,
        r.fullname regionname,
        r.abbreviation regionabbreviation 
      FROM clubs c
      LEFT JOIN
        regions r ON r.id = c.regionid`

    if (opt && opt.id) {
      sql += ' WHERE c.id = $1'
      params.push(opt.id)
    }

    sql += ' ORDER BY c.fullname asc'

    return db
      .query(sql, params)
      .then(res =>res.rows.map(mapToClub))
  }
}


