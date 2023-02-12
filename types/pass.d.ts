
export type Pass = {
    id: number | string,
    athleteid: number | string,
    qr?: number | string,
    created?: number | string,
    expires?: number | string
}
export type SelectPassOptions = {
    athleteId?:string|number
}

export type InsertPass=(athleteId:Pass)=>Promise<number>
export type SelectPasses=(opt:SelectPassOptions)=>Promise<number>
