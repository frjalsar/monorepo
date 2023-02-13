import { toOrdinal } from 'pg-parameterize'
import { PoolClient } from 'pg'
import { SelectJudges } from 'types/judge'
import { mapToJudges } from './map'

export type MakeSelectJudges = (db: PoolClient) => SelectJudges

export const makeSelectJudges: MakeSelectJudges = function (db) {
  return function selectJudges (opt) {
    const params: Array<number | string> = []

    let sql = `
      SELECT
        j.id,
        j.fullname,
        j.date,
        j.typeid,
        j.clubid,        
        jt.name typename,
        jt.stage typestage,
        c.fullname clubfullname,
        c.thorid clubthorid
      FROM
        judges j
      LEFT JOIN
        judgetypes jt ON jt.id = j.typeid
      LEFT JOIN
        clubs c ON c.id = j.clubid
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
      .then(res => res.rows.map(mapToJudges))
  }
}
