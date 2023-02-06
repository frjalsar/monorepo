
import { toOrdinal } from 'pg-parameterize'
import {mapUsers} from './map'
import { PoolClient } from 'pg'
import { SelectUsers } from 'types/user'

export type MakeSelectUsers=(db:PoolClient)=>SelectUsers

export const makeSelectUsers:MakeSelectUsers=function (db) {
  return function selectUsers (opt) {
    
    const selectPassword =opt?Boolean(opt.username):false
    const params:Array<string|number> = []
    let sql = `
      SELECT
        u.id,
        u.username,
        ${selectPassword ? 'u.password,' : ''}
        u.fullname,
        u.meetid,
        u.clubid,
        c.abbreviation clubabbreviation,
        u.regionid,
        r.abbreviation regionabbreviation,
        u.admin,
        u.application,
        u.token
      FROM users u
      LEFT JOIN
        clubs c ON c.id = u.clubid
      LEFT JOIN
        regions r ON r.id = u.regionid
      WHERE 1=1`

    if (opt && opt.username) {
      sql += ' AND username = ?'
      params.push(opt.username)
    }

    if (opt && opt.id) {
      sql += ' AND u.id = ?'
      params.push(opt.id)
    }

    if (opt && opt.token) {
      sql += ' AND u.token = ?'
      params.push(opt.token)
    }

    sql += ' ORDER BY u.fullname ASC'

    return db
      .query(toOrdinal(sql), params)
      .then(res => res.rows.map(mapUsers))
  }
}

