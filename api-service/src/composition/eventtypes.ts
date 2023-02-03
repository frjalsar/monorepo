import { PoolClient } from 'pg'
import { IRouter } from 'express'
import {makeSelectEventTypes} from '../repo/eventtypes/select'
import {makeUpdateEventType} from '../repo/eventtypes/update'
import {makeInsertEventType} from '../repo/eventtypes/insert'
import {makeEventTypesRouter} from '../routes/eventtypes'
import { insertEventType, selectEventTypes, updateEventType } from 'types/event-type'

export type MakeEventTypes = (db: PoolClient) => IRouter

export function makeEventTypes (db) {

  const selectEventTypes:selectEventTypes = makeSelectEventTypes(db)
  const updateEventType:updateEventType = makeUpdateEventType(db)
  const insertEventType:insertEventType = makeInsertEventType(db)

  return makeEventTypesRouter(selectEventTypes, updateEventType, insertEventType)
}

