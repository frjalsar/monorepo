import { PoolClient } from 'pg'
import { UpdateEvent } from 'types/events'

export type MakeUpdateEvent = (db: PoolClient) => UpdateEvent

export const makeUpdateEvent: MakeUpdateEvent = function (db) {
  return function updateEvent (event, user) {
    const sql = `
      UPDATE events SET
        name = $1,
        official = $2,
        typeid = $3,
        thorid = $4,
        _userid = $5,
        _enabled = true,
        _time = CURRENT_TIMESTAMP(3)
      WHERE
        id = $6
      RETURNING id`

    const params = [
      event.name,
      event.official,
      event.typeId,
      event.thorId,
      user.id,
      event.id
    ]

    return db
      .query(sql, params)
      .then(res => res.rows[0].id)
  }
}
