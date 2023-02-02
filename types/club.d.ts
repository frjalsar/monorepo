import { Region } from './region'

export type club = {
  id: number,
  fullName: string,
  shortName: string,
  abbreviation: string,
  thorId: number,
  regionId:number;
  region: Region
}

export type MapToClub = (row: any) => club

export type selectClubOptions = {
  id: number | string
}

export type selectClubs = (options?: selectClubOptions) => Promise<club[]>
export type insertClub = (club: club, user: any) => Promise<number>
export type updateClub = (club: club, user: any) => Promise<number>