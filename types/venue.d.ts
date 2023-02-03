
export type venue = {
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
    certification: boolean
    _userid?:number
}
export type SelectVunuesOptions = {
    id?: string | number | undefined ,
    offset?: number | string,
    limit?: number|string
}

export type mapToVenues=(row:any) => venue

export type insertVenue = (venue:venue,user:any) => Promise<venue[]>
export type selectVenues = (options?: SelectVunuesOptions)=>Promise<number>
export type updateVenue = (venue:venue,user:any)=>Promise<number>