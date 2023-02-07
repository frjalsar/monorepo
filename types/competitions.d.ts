
export type Competition = {
    meetId:number,
    eventId:number,
    ageFrom:number,
    ageTo:number,
    gender:number,
    indoor: number    
    id?: number,
}

export type CompetitionsSelectOptions = {
    meetId?: number | string
}

export type MapToCompetitions = (item:any)=>Competition

export type InsertCompetition=(competition:Competition[], user:any)=>Promise<number>
export type SelectCompetitions=(opt?:CompetitionsSelectOptions)=>Promise<Competition[]>