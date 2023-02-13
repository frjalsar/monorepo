import { User } from './user'

export type Region = {
  id: number
  fullName: string
  abbreviation: string
}

export type MapToRegion = (row: any) => Region

export type SelectRegionOptions = {
  id: number | string
}

export type SelectRegions = (options?: SelectRegionOptions) => Promise<Region[]>
export type InsertRegion = (region: Region, user: User) => Promise<number>
export type UpdateRegion = (region: Region, user: User) => Promise<number>
