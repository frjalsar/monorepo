import { Region } from './region'

export type Club = {
  id: Number,
  fullName: String,
  shortName: String,
  abbreviation: String,
  thorId: Number,
  regionId:number;
  region: Region
}

export type MapToClub = (row: any) => Club

export type SelectClubOptions = {
  id: number | string
}

export type SelectClubs = (options?: SelectClubOptions) => Promise<Club[]>
export type InsertClub = (club: Club, user: any) => Promise<number>
export type UpdateClub = (club: Club, user: any) => Promise<number>