import {makeSelectEvents} from '../repo/events/select'
import { PoolClient } from 'pg'
import { IRouter } from 'express'
import {makeUpdateEvent} from '../repo/events/update'
import {makeInsertEvent} from '../repo/events/insert'
import {makeDeleteCombinedEvents} from '../repo/combinedevents/delete'
import {makeInsertCombinedEvents} from '../repo/combinedevents/insert'
import {makeEditEvent} from '../repo/events/edit'
import {makeCreateEvent} from '../repo/events/create'
import {makeEventsRouter} from '../routes/events'
import { editEvent, selectEvents } from 'types/event'

export type MakeEvents = (db: PoolClient) => IRouter

export function makeEvents (db) {

  const selectEvents:selectEvents = makeSelectEvents(db)
  const editEvent:editEvent = makeEditEvent(db)
  const createEvent = makeCreateEvent(db)

  return makeEventsRouter(selectEvents, editEvent, createEvent)
}

