import { mapToCompetition } from './map'
import { PoolClient } from 'pg'
import { SelectCompetitions } from 'types/competition'

export type MakeSelectCompetitions = (db: PoolClient) => SelectCompetitions

export const makeSelectCompetitions: MakeSelectCompetitions = function (db) {
  return function selectCompetitions (opt) {
    const params: Array<string | number> = []
    let sql = `
      SELECT
        c.id competition_id,
        c.meetid meet_id,
        c.eventid event_id,
        c.agefrom competition_agefrom,
        c.ageto competition_ageto,
        c.gender competition_gender,
        c.indoor competition_indoor
      FROM
        competitions c
      LEFT JOIN
        meets m ON m.id = c.meetid
      LEFT JOIN
        events e ON e.id = c.eventid
      WHERE 1 = 1`

    if (opt && opt.meetId) {
      sql += ' AND c.meetid = $1'
      params.push(opt.meetId)
    }

    sql += 'ORDER BY c.id ASC'

    return db
      .query(sql, params)
      .then(res => res.rows.map(mapToCompetition))
  }
}
