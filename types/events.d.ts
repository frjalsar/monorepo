import { EventType } from './eventtype'
import { User } from './user'

export type Event = {
  id: number
  name: string
  official: boolean
  worldrecord: boolean,
  typeId: number
  type: EventType
  thorId?: number
  childEvents?: Partial<Event>[]
}

export type MapToEvent = (row: any) => Event

export type SelectEventOptions = {
  id?: number | string
  typeId?: number | string
}

export type SelectEvents = (options?: SelectEventOptions) => Promise<Event[]>
export type InsertEvent = (event: Event, user: User) => Promise<number>
export type UpdateEvent = (event: Event, user: User) => Promise<number>
export type CreateEvent = (event: Event, user: User) => Promise<number>
export type EditEvent = (event: Event, user: User) => Promise<number>
