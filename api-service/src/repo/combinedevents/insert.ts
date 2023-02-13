import { flatten, toTuple } from 'pg-parameterize'
import { InsertCombinedEvent } from 'types/combinedevent'
import { PoolClient } from 'pg'

export type MakeInsertCombinedEvent = (dp:PoolClient)=>InsertCombinedEvent

export const makeInsertCombinedEvents:MakeInsertCombinedEvent = function (db) {
  return function insertMembership (combinedEvents, user) {
    if (combinedEvents.length === 0) {
      return Promise.resolve()
    }

    const arr = combinedEvents.map(obj => [
      obj.parentEventId,
      obj.childEventId,
      user.id
    ])

    const sql = `
      INSERT INTO combinedevents(
        parenteventid,
        childeventid,
        _userid
      )
      VALUES ` + toTuple(arr, true)

    const params = flatten(arr)

    return db.query(sql, params)
  }
}
