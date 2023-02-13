import { User } from './user'

export type Event = {
  id: number
  name: string
  iaaf: string
  typeId: number
  childeventId: number
  type: any
  thorId?: number
  childEvents: any[]
}

export type MapToEvent = (list: any[]) => Event[]

export type SelectEventOptions = {
  id?: number | string
  typeId?: number | string
}

export type SelectEvents = (options?: SelectEventOptions) => Promise<Event[]>
export type InsertEvent = (event: Event, user: User) => Promise<number>
export type UpdateEvent = (event: Event, user: User) => Promise<number>
export type CreateEvent = (event: Event, user: User) => Promise<number>
export type EditEvent = (event: Event, user: User) => Promise<number>
