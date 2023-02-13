import { mapMeets } from './map'
import { PoolClient } from 'pg'
import { SelectMeets } from 'types/meet'

export type MakeSelectMeets = (db: PoolClient) => SelectMeets

export const makeSelectMeets: MakeSelectMeets = function (db) {
  return function selectMeets (opt) {
    const params: Array<string | number> = []
    let sql = `
      SELECT
        m.id meet_id,
        m.name meeet_name,
        m.organizername meet_organizername,
        m.organizerkt meet_organizerkt,
        m.contactname meet_contactname,
        m.contactemail meet_contactemail,
        m.contactphone meet_contactphone,
        m.location meet_location,
        m.venueid venue_id,
        v.fullname venue_fullname,
        m.judgeid judge_id,
        j.fullname judge_fullname,
        m.startdate meet_startdate,
        m.enddate meet_enddate,
        m.status meet_status,
        m.sent meet_sent,
        (m.attachment IS NOT NULL) meet_hasattachment,
        c.id competitionid competition_id,
        c.agefrom competition_agefrom,
        c.ageto competition_ageto,
        c.gender competition_gender,
        e.id eventid event_id,
        e.name eventname event_name
      FROM
        meets m
      LEFT JOIN
        competitions c ON c.meetid = m.id
      LEFT JOIN
        events e ON e.id = c.eventid
      LEFT JOIN
        venues v ON v.id = m.venueid
      LEFT Join
        judges j ON j.id = m.judgeid
      WHERE 1=1`

    if (opt && opt.id) {
      sql += ' AND m.id = $1'
      params.push(opt.id)
    } else if (opt && opt.status) {
      sql += ' AND m.status = $1'
      params.push(opt.status)
    }

    sql += ' ORDER BY m.name ASC'

    return db
      .query(sql, params)
      .then(res => mapMeets(res.rows))
  }
}
