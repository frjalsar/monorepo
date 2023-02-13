import { Club } from './club'
import { Region } from './region'
import { Membership } from './membership'
import { User } from './user'

export type Athlete = {
  id: number
  fullName: string
  kt: string
  birthyear: number
  gender: string
  country: string
  thorId: number
  lastCompeted: Date
  club: Partial<Club>
  region: Region
  membership: Membership[]
  newMembership?: Membership[]
}

export type MapToAthlete = (row: any) => Athlete

export type SelectAthleteOptions = {
  id?: number | string
  typeId?: number | string
  kt?: number | string
  gender?: number | string
  startsWith?: number | string
  search?: number | string
  regionId?: number
  clubId?: number
  thorClubId?: number | string
  legacyClub?: number | string
  birthyearFrom?: number
  birthyearTo?: number
  lastCompeted?: string
  offset?: number
  limit?: number
}

export type SelectAthletes = (options: SelectAthleteOptions, user: User) => Promise<Athlete[]>
export type InsertAthlete = (athlete: Athlete, user: User) => Promise<number>
export type UpdateAthlete = (athlete: Athlete, user: User) => Promise<number>
export type CreateAthlete = (athlete: Athlete, user: User) => Promise<number>
export type EditAthlete = (athlete: Athlete, user: User) => Promise<number>
