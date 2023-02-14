import { User } from './user'

export type Venue = {
    id?: number
    fullName: string
    indoor: boolean
    banked: boolean
    straightLanes: number | undefined
    ovalLanes: number | undefined
    longTripleJump: number | undefined
    polevault: number | undefined
    hammerDiscus: number | undefined
    javelin: number | undefined
    shotPut: number | undefined
    material: string
    constructionYear: number | undefined
    renovationYear: number | undefined
    warmupTrack: boolean
    throwingField: boolean
    certification: boolean
    _userid?: number
}

export type SelectVenuesOptions = {
    id?: string | number
    offset?: number | string
    limit?: number | string
}

export type MapToVenues = (row: any) => Venue

export type InsertVenue = (venue: Venue, user: User) => Promise<Venue[]>
export type SelectVenues = (options?: SelectVenuesOptions) => Promise<number>
export type UpdateVenue = (venue: Venue, user: User) => Promise<number>
