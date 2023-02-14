import { toOrdinal } from 'pg-parameterize'
import { PoolClient } from 'pg'
import { SelectMemberships } from 'types/membership'
import { mapToMembership } from './map'

export type MakeSelectMembership = (db: PoolClient) => SelectMemberships

export const makeSelectMembership: MakeSelectMembership = function (db) {
  return function selectMembership (opt) {
    const params:Array<number| string> = []
    let sql = `
      SELECT
        m.athleteid athlete_id,
        m.clubid club_id,
        m.yearfrom membership_yearfrom,
        m.yearto membership_yearfrom,
        m.legacyclub membership_legacyclub,
        m.confirmed membership_confirmed,
        c.fullname club_fullname
      FROM
        membership m
      LEFT JOIN
        clubs c ON c.id = m.clubid
      WHERE
        _enabled = true`

    if (opt && opt.athleteId) {
      sql += ' AND m.athleteid = ?'
      params.push(opt.athleteId)
    }

    if (opt && opt.clubId) {
      sql += ' AND m.clubid = ?'
      params.push(opt.clubId)
    }

    if (opt && opt.confirmed !== undefined && opt.confirmed !== null) {
      sql += ' AND m.confirmed = ?'
      params.push(opt.confirmed)
    }

    sql += `
      ORDER BY
        m.athleteid ASC,
        m.yearfrom ASC`

    // Lets not return all data
    if (params.length === 0) {
      return Promise.resolve([])
    }

    return db
      .query(toOrdinal(sql), params)
      .then(res => res.rows.map(mapToMembership))
  }
}
