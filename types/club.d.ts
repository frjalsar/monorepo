import { Region } from './region'
import { User } from './user'

export type Club = {
  id: number
  fullName: string
  shortName: string
  abbreviation: string
  thorId: number
  regionId: number
  region?: Region
}

export type MapToClub = (row: any) => Club
export type MapToClubPartial = (row: any) => Partial<Club>

export type SelectClubOptions = {
  id: number | string
}

export type SelectClubs = (options?: SelectClubOptions) => Promise<Club[]>
export type InsertClub = (club: Club, user: User) => Promise<number>
export type UpdateClub = (club: Club, user: User) => Promise<number>
