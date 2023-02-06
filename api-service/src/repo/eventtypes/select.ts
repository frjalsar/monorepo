import {mapEventTypes} from './map'
import { SelectEventTypes } from 'types/event-type'
import {PoolClient} from 'pg'

export type MakeSelectEventTypes=(db:PoolClient)=>SelectEventTypes

export const makeSelectEventTypes:MakeSelectEventTypes= function (db) {
  return function selectEventTypes () {
    const params = []
    const sql = `
      SELECT
        et.id,
        et.name,
        et.ordering
      FROM
        eventtypes et
      ORDER BY
        et.ordering ASC,
        et.name ASC`

    return db
      .query(sql, params)
      .then(res => res.rows.map(mapEventTypes))
  }
}

