import { User } from './user'

export type Combinedevent = {
  parentEventId: number
  childEventId: number
};

export type MapToCombinedEvent = (row: any, parentEventId: number) => Combinedevent

export type InsertCombinedEvent = (combinedEvents: Combinedevent[], user: User) => Promise<number>
export type DeleteCombinedEvent = (parentEventId: number, user: User) => Promise<number>
