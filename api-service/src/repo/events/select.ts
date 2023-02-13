import { SelectEvents } from 'types/events'
import { PoolClient } from 'pg'
import { mapEvents } from './map'

export type MakeSelectEvents = (db: PoolClient) => SelectEvents

export const makeSelectEvents: MakeSelectEvents = function (db) {
  return function selectEvents (opt) {
    const params:Array<number|string> = []
    let sql = `
      SELECT
        e.id event_id,
        e.strid event_strid,
        e.name event_name,
        e.official event_official,
        e.worldrecord event_worldrecord,
        e.typeid eventtype_id,
        et.name eventtype_name,
        ce.childeventid childevent_id,
        e2.name childevent_name
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
