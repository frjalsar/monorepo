import { PoolClient } from 'pg'
import { IRouter } from 'express'
import {makeSelectEvents} from '../repo/events/select'
import {makeEditEvent} from '../repo/events/edit'
import {makeCreateEvent} from '../repo/events/create'
import {makeEventsRouter} from '../routes/events'

export type MakeEventTypes = (db: PoolClient) => IRouter

export function makeEvents (db) {

  const selectEvents = makeSelectEvents(db)
  const editEvent = makeEditEvent(db)
  const createEvent = makeCreateEvent(db)

  return makeEventsRouter(selectEvents, editEvent, createEvent)
}


