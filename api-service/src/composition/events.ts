import { PoolClient } from 'pg'
import { IRouter } from 'express'
import { makeSelectEvents } from '../repo/events/select'
import { makeEditEvent } from '../repo/events/edit'
import { makeCreateEvent } from '../repo/events/create'
import { makeEventsRouter } from '../routes/events'
import { CreateEvent, EditEvent, SelectEvents } from 'types/events'

export type MakeEventTypes = (db: PoolClient) => IRouter

export function makeEvents (db) {
  const selectEvents: SelectEvents = makeSelectEvents(db)
  const editEvent: EditEvent = makeEditEvent(db)
  const createEvent: CreateEvent = makeCreateEvent(db)

  return makeEventsRouter(selectEvents, editEvent, createEvent)
}
