
import { toOrdinal } from 'pg-parameterize'
import { mapToVenue } from './map'
import { PoolClient } from 'pg'
import { SelectVenues } from 'types/venue'

export type MakeSelectVenues = (db: PoolClient) => SelectVenues

export const makeSelectVenues: MakeSelectVenues = function (db) {
  return function selectVenues (opt) {
    const params: Array<string | number> = []
    let sql = `
      SELECT
        v.id venue_id,
        v.fullname venue_fullname,
        v.indoor venue_indoor,
        v.banked venue_banked,
        v.straightlanes venue_straightlanes,
        v.ovallanes venue_ovallanes,
        v.longtriplejump venue_longtriplejump,
        v.polevault venue_polevault,
        v.hammerdiscus venue_hammerdiscus,
        v.javelin venue_javelin,
        v.shotput venue_shotput,
        v.material venue_material,
        v.constructionyear venue_constructionyear,
        v.renovationyear venue_renovationyear,
        v.warmuptrack venue_warmuptrack,
        v.throwingfield venue_throwingfield,
        v.certification venue_certification
      FROM
        venues v
      WHERE _enabled = true`

    if (opt && opt.id) {
      sql += ' AND v.id = ?'
      params.push(opt.id)
    }

    sql += ` 
      ORDER BY
        v.fullname ASC`

    if (opt && opt.offset) {
      sql += ' OFFSET ' + opt.offset
    }

    if (opt && opt.limit) {
      sql += ' LIMIT ' + opt.limit
    }

    return db
      .query(toOrdinal(sql), params)
      .then(res => res.rows.map(mapToVenue))
  }
}
