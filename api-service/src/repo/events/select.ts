import { SelectEvents } from 'types/events'
import { PoolClient } from 'pg'
import { mapEvents } from './map'

export type MakeSelectEvents = (db: PoolClient) => SelectEvents

export const makeSelectEvents: MakeSelectEvents = function (db) {
  return function selectEvents (opt) {
    const params:Array<number|string> = []
    let sql = `
      SELECT
        e.id,
        e.strid,
        e.name,
        e.iaaf,
        e.worldrecord,
        e.typeid,
        et.name typename,
        ce.childeventid childeventid,
        e2.name childeventname
      FROM
        events e
      JOIN
        eventtypes et ON e.typeid = et.id
      LEFT JOIN (
        combinedevents ce
        JOIN
          events e2 ON e2.id = ce.childeventid)
        ON ce.parenteventid = e.id
      WHERE 1 = 1`

    if (opt && opt.typeId) {
      sql += ' AND e.typeid = $1'
      params.push(opt.typeId)
    }

    sql += ' ORDER BY e.name ASC, et.name ASC'

    return db
      .query(sql, params)
      .then(res => mapEvents(res.rows))
  }
}
