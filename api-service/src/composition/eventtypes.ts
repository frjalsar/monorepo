import { PoolClient } from 'pg'
import { IRouter } from 'express'
import { makeSelectEventTypes } from '../repo/eventtypes/select'
import { makeUpdateEventType } from '../repo/eventtypes/update'
import { makeInsertEventType } from '../repo/eventtypes/insert'
import { makeEventTypesRouter } from '../routes/eventtypes'
import { InsertEventType, SelectEventTypes, UpdateEventType } from 'types/eventtype'

export type MakeEventTypes = (db: PoolClient) => IRouter

export function makeEventTypes (db) {
  const selectEventTypes:SelectEventTypes = makeSelectEventTypes(db)
  const updateEventType:UpdateEventType = makeUpdateEventType(db)
  const insertEventType:InsertEventType = makeInsertEventType(db)

  return makeEventTypesRouter(selectEventTypes, updateEventType, insertEventType)
}
