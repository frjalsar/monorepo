import { PoolClient } from 'pg'
import { SelectRegistrations } from 'types/registration'
import { mapToRegistration } from './map'

export type MakeSelectRegistrations = (db: PoolClient) => SelectRegistrations

export const makeSelectRegistrations: MakeSelectRegistrations = function (db) {
  return function selectRegistrations (opt) {
    let sql = `SELECT 
    r.id registration_id,
    r.note registration_note,
    a.id athlete_id,
    a.fullname athlete_fullname, 
    a.thorid athlete_thorid,
    a.country athlete_country,
    a.gender athlete_gender,
    a.birthyear athlete_birthyear,
    a.kt athlete_kt,
    c.id competition_id,
    c.meetid  competition_meetid,
    c.eventid  competition_eventid,
    c.ageto competition_ageto,
    c.agefrom  competition_agefrom
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
