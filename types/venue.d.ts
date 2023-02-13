import { User } from './user'

export type Venue = {
    id?: number,
    fullName: string,
    indoor: boolean,
    banked: boolean,
    straightLanes: number,
    ovalLanes: number,
    longTripleJump: number,
    polevault: number,
    hammerDiscus: number,
    javelin: number,
    shotPut: number,
    material: string,
    constructionYear: number,
    renovationYear: number,
    warmupTrack: boolean,
    throwingField: boolean,
    certification: boolean,
    _userid?: number
}

export type SelectVunuesOptions = {
    id?: string | number | undefined,
    offset?: number | string,
    limit?: number | string
}

export type MapToVenues = (row: any) => Venue

export type InsertVenue = (venue: Venue, user: User) => Promise<Venue[]>
export type SelectVenues = (options?: SelectVunuesOptions) => Promise<number>
export type UpdateVenue = (venue: Venue, user: User) => Promise<number>
