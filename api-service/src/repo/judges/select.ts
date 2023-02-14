import { toOrdinal } from 'pg-parameterize'
import { PoolClient } from 'pg'
import { SelectJudges } from 'types/judge'
import { mapToJudge } from './map'

export type MakeSelectJudges = (db: PoolClient) => SelectJudges

export const makeSelectJudges: MakeSelectJudges = function (db) {
  return function selectJudges (opt) {
    const params: Array<number | string> = []

    let sql = `
      SELECT
        j.id judge_id,
        j.fullname judge_fullname,
        j.date judge_date,        
        jt.id judgetype_id,
        jt.name judgetype_name,
        jt.stage judgetype_stage,
        c.id club_id,
        c.fullname club_fullname,
        c.thorid club_thorid,
        r.id region_id,
        r.fullname region_fullname,
        r.abbreviation region_abbreviation
      FROM
        judges j
      LEFT JOIN
        judgetypes jt ON jt.id = j.typeid
      LEFT JOIN
        clubs c ON c.id = j.clubid
      LEFT JOIN
        regions r ON r.id = c.regionid
      WHERE 1 = 1`

    if (opt && opt.id) {
      sql += ' AND j.id = ?'
      params.push(opt.id)
    }

    if (opt && opt.clubId) {
      sql += ' AND c.id = ?'
      params.push(opt.clubId)
    }

    if (opt && opt.typeId) {
      sql += ' AND jt.id = ?'
      params.push(opt.typeId)
    }

    sql += ` 
      ORDER BY
        j.fullname ASC,
        jt.stage ASC`

    if (opt && opt.offset) {
      sql += ' OFFSET ' + opt.offset
    }

    if (opt && opt.limit) {
      sql += ' LIMIT ' + opt.limit
    }

    return db
      .query(toOrdinal(sql), params)
      .then(res => res.rows.map(mapToJudge))
  }
}
