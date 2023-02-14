import { PoolClient } from 'pg'
import { SelectClubs } from 'types/club'
import { mapToClub } from './map'

export type MakeSelectClubs = (db: PoolClient) => SelectClubs

export const makeSelectClubs: MakeSelectClubs = function (db) {
  return function selectClubs (opt) {
    const params: Array<number | string> = []
    let sql = `
      SELECT
        c.id,
        c.fullname club_fullname,
        c.shortname club_shortname,
        c.abbreviation club_abbreviation,
        c.thorid club_thorid,
        r.id region_id,
        r.fullname region_fullname,
        r.abbreviation region_abbreviation 
      FROM
        clubs c
      LEFT JOIN
        regions r ON r.id = c.regionid`

    if (opt && opt.id) {
      sql += ' WHERE c.id = $1'
      params.push(opt.id)
    }

    sql += ' ORDER BY c.fullname asc'

    return db
      .query(sql, params)
      .then(res => res.rows.map(mapToClub))
  }
}
