import { UpdateEventType } from 'types/eventtype'
import { PoolClient } from 'pg'

export type MakeUpdateEventType=(db:PoolClient)=>UpdateEventType

export const makeUpdateEventType:MakeUpdateEventType = function (db) {
  return function updateEventType (eventType, user) {
    const sql = `
      UPDATE eventtypes SET
        name = $1,
        ordering = $2,
        _userid = $3,
        _enabled = true,
        _time = CURRENT_TIMESTAMP(3)
      WHERE
        id = $4
      RETURNING id`

    const params = [
      eventType,
      eventType.ordering,
      user.id,
      eventType.id
    ]

    return db
      .query(sql, params)
      .then(res => res.rows[0].id)
  }
}
