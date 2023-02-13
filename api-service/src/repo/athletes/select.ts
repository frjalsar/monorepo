import { PoolClient } from 'pg'
import { SelectAthletes } from 'types/athlete'
import * as toOrdinal from 'pg-parameterize'
import * as lodash from 'lodash'
import { mapAthletes } from './map'

export type MakeSelectAthletes = (db: PoolClient) => SelectAthletes

export const makeSelectAthletes: MakeSelectAthletes = function (db) {
  return function selectAthletes (opt, user) {
    const hasEmptyProperties = Object.values(opt).every(i => i === '')
    if (lodash.isEmpty(opt) || hasEmptyProperties) {
      return Promise.resolve([])
    }

    const canViewKt = user || !!opt.kt
    const params:Array<number| string> = []
    let sql = `
      SELECT
        a.id,
        a.fullname,
        ${canViewKt ? 'a.kt,' : ''}
        a.birthyear,
        a.gender,
        a.country,
        a.thorid,
        a.lastcompeted,
        c.id as clubid,
        c.fullname as clubname,        
        c.thorid as thorclubid,
        c.regionid,
        r.fullname regionfullname,
        r.abbreviation regionabbreviation,
        m.yearfrom,
        m.yearto,
        m.legacyclub,
        m.confirmed,
        u.fullName as userfullname
      FROM
        athletes a
      LEFT JOIN
        membership m ON m.athleteid = a.id AND m._enabled = true
      LEFT JOIN 
        clubs c ON c.id = m.clubid
      LEFT JOIN
        regions r ON r.id = c.regionid
      LEFT JOIN
        users u ON u.id = m._userid
      WHERE 1=1`

    if (opt.id) {
      sql += ' AND a.id = ?'
      params.push(opt.id)
    }

    if (opt.gender) {
      sql += ' AND a.gender = ?'
      params.push(opt.gender)
    }

    if (opt.startsWith) {
      sql += ' AND a.fullname like ?'
      params.push(opt.startsWith + '%')
    }

    if (opt.search) {
      sql += ' AND (a.fullname ilike ? OR a.kt like ?)'
      params.push('%' + opt.search + '%')
      params.push(opt.search + '%')
    }

    if (opt.regionId) {
      sql += ' AND c.regionid = ? AND m.yearTo is null'
      params.push(opt.regionId)
    }

    if (opt.clubId) {
      sql += ' AND c.id = ? AND m.yearTo is null'
      params.push(opt.clubId)
    }

    if (opt.thorClubId) {
      sql += ' AND c.thorid = ? AND m.yearTo is null'
      params.push(opt.thorClubId)
    }

    if (opt.legacyClub) {
      sql += ' AND m.legacyClub = ?'
      params.push(opt.legacyClub)
    }

    if (opt.birthyearFrom) {
      sql += ' AND a.birthyear >= ?'
      params.push(opt.birthyearFrom)
    }

    if (opt.birthyearTo) {
      sql += ' AND a.birthyear <= ?'
      params.push(opt.birthyearTo)
    }

    if (opt.kt) {
      sql += ' AND a.kt = ANY(?)'
      params.push('{' + opt.kt + '}')
    }

    if (opt.lastCompeted) {
      sql += ' AND a.lastcompeted >= ?'
      params.push(opt.lastCompeted)
    }

    sql += ` 
      ORDER BY
        a.fullname ASC,
        a.id ASC,
        m.yearfrom ASC`

    if (opt.offset) {
      sql += ' OFFSET ' + opt.offset
    }

    if (opt.limit) {
      sql += ' LIMIT ' + opt.limit
    }

    return db
      .query(toOrdinal.toOrdinal(sql), params)
      .then(res => mapAthletes(res.rows))
  }
}
