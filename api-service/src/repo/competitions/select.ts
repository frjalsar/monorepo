import { mapCompetitions } from './map'
import { PoolClient } from 'pg'
import {SelectCompetitions} from 'types/competitions'

export type MakeSelectCompetitions=(db:PoolClient,logger) => SelectCompetitions

export const makeSelectCompetitions:MakeSelectCompetitions = function (db,logger) {
  return function selectCompetitions(opt) {

    logger.info("...................................")
    logger.info(opt)
    logger.info('...................................')
    
    const params:Array<string|number> = []
    let sql = `
      SELECT
        c.id,
        c.meetid,
        c.eventid,
        c.agefrom,
        c.ageto,
        c.gender,
        c.indoor
      FROM
        competitions c
      --LEFT JOIN
        --meets m ON m.id = c.meetid
      WHERE 1 = 1`

    if (opt && opt.meetId) {
      sql += ' AND c.meetid = $1'
      params.push(opt.meetId)
    }

    sql += 'ORDER BY c.id ASC'

    return db
      .query(sql, params)
      .then(res => res.rows.map(mapCompetitions))
  }
}
