import { PoolClient } from 'pg'
import { IRouter } from 'express'
import {makeSelectEventTypes} from '../repo/eventtypes/select'
import {makeUpdateEventType} from '../repo/eventtypes/update'
import {makeInsertEventType} from '../repo/eventtypes/insert'
import {makeEventTypesRouter} from '../routes/eventtypes'

export type MakeEventTypes = (db: PoolClient) => IRouter

export function makeEventTypes (db) {

  const selectEventTypes = makeSelectEventTypes(db)
  const updateEventType = makeUpdateEventType(db)
  const insertEventType = makeInsertEventType(db)

  return makeEventTypesRouter(selectEventTypes, updateEventType, insertEventType)
}

