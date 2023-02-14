import { PoolClient } from 'pg'
import { SelectRegistrations } from 'types/registration'
import { mapToRegistration } from './map'

export type MakeSelectRegistrations = (db: PoolClient) => SelectRegistrations

export const makeSelectRegistrations: MakeSelectRegistrations = function (db) {
  return function selectRegistrations (opt) {
    let sql = `SELECT 
    r.id,
    a.id as athleteid,
    a.fullname, 
    a.thorid,
    a.country,
    a.gender,
    a.birthyear,
    a.kt,
    c.id as competitionid,
    c.meetid,
    c.eventid,
    c.ageto,
    c.agefrom
    FROM registrations r 
                LEFT JOIN 
                    athletes a  
                    ON  r.athleteid = a.id
                LEFT JOIN 
                    competitions c  
                    ON  r.competitionid = c.id  `

    const params: Array<string | number> = []

    if (opt && opt.id) {
      sql += '  WHERE r.id = $1 '
      params.push(opt.id)
    }

    if (opt && opt.atheleteid) {
      sql += '  WHERE r.athleteid = $1 '
      params.push(opt.atheleteid)
    }

    if (opt && opt.competitionid) {
      sql += '  WHERE r.competitionid = $1 '
      params.push(opt.competitionid)
    }

    return db
      .query(sql, params)
      .then(res => res.rows.map(mapToRegistration))
  }
}
