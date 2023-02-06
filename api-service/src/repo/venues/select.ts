
import { toOrdinal } from 'pg-parameterize'
import { mapVenues } from './map'
import {PoolClient} from 'pg'
import { SelectVenues } from 'types/venue'

export type MakeSelectVenues=(db:PoolClient) => SelectVenues

export const makeSelectVenues:MakeSelectVenues = function (db) {
  return function selectVenues(opt) {

    const params:Array<string | number> = []
    let sql = `
      SELECT
        v.id,
        v.fullname,
        v.indoor,
        v.banked,
        v.straightlanes,
        v.ovallanes,
        v.longtriplejump,
        v.polevault,
        v.hammerdiscus,
        v.javelin,
        v.shotput,
        v.material,
        v.constructionyear,
        v.renovationyear,
        v.warmuptrack,
        v.throwingfield,
        v.certification
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
      .then(res => res.rows.map(mapVenues))
  }
}

