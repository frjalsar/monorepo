import { InsertEvent } from 'types/events'
import { PoolClient } from 'pg'

export type MakeInsertEvent = (db: PoolClient) => InsertEvent

export const makeInsertEvent: MakeInsertEvent = function (db) {
  return function insertEvent (event, user) {
    const sql = `
      INSERT INTO events (
        name,
        official,
        typeid,
        thorid,
        _userid,
        _enabled,
        _time
      )
      VALUES ($1, $2, $3, $4, $5, true, CURRENT_TIMESTAMP(3))
      RETURNING id`

    const params = [
      event.name,
      event.official,
      event.typeId,
      event.thorId,
      user.id
    ]

    return db
      .query(sql, params)
      .then(res => res.rows[0].id)
  }
}
