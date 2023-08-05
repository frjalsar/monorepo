import { User } from './user'

export type Competition = {
  meetId: number
  eventId: number
  ageFrom: number
  ageTo: number
  gender?: number
  indoor?: number
  id?: number
  eventName?: string
}

export type CompetitionsSelectOptions = {
    meetId?: number | string
}

export type MapToCompetitions = (item: any) => Competition

export type InsertCompetition = (competition: Competition[], user: User) => Promise<number>
export type SelectCompetitions = (opt?: CompetitionsSelectOptions) => Promise<Competition[]>
