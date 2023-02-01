import { Region } from './region'

export type club = {
  id: Number,
  fullName: String,
  shortName: String,
  abbreviation: String,
  thorId: Number,
  regionId:number;
  region: Region
}

export type MapToClub = (row: any) => club

export type SelectClubOptions = {
  id: number | string
}

export type SelectClubs = (options?: SelectClubOptions) => Promise<club[]>
export type InsertClub = (club: club, user: any) => Promise<number>
export type UpdateClub = (club: club, user: any) => Promise<number>