import {InsertEventType} from 'types/eventtype'
import {PoolClient} from 'pg'

export type MakeInsertEventType=(db:PoolClient)=>InsertEventType

export const makeInsertEventType:MakeInsertEventType= function (db) {
  return function insertEventType (eventType, user) {
    const sql = `
      INSERT INTO eventtypes (
        name,
        ordering,
        _userid,
        _enabled,
        _time
      )
      VALUES ($1, $2, $3, true, CURRENT_TIMESTAMP(3))
      RETURNING id`

    const params = [
      eventType.name,
      eventType.ordering,
      user.id
    ]

    return db
      .query(sql, params)
      .then(res => res.rows[0].id)
  }
}

