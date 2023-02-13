import { DeleteCombinedEvent } from 'types/combinedevent'
import { PoolClient } from 'pg'

export type MakeDeleteCombinedEvents = (db: PoolClient) => DeleteCombinedEvent

export const makeDeleteCombinedEvents: MakeDeleteCombinedEvents = function (db) {
  return function deleteCombinedEvents (parentEventId) {
    const sql = `
      DELETE FROM
        combinedevents
      WHERE
         parenteventid = $1`

    const params = [parentEventId]

    return db
      .query(sql, params)
  }
}
