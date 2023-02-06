
export type Achievements = {
    
}

export type OptionsThorEventSelect = {
    gender:any,
    outside:any
}
export type OptionsCompetitorSelect = {
    kt:string
}

export type OptionsAchievementSelect = {
    thorAthleteId?: string | number,
    limit?: string | number,
    gender?: string | number,
    inside?: string | number,
    thorEventId?: string | number,
    dateFrom?: string | number,
    dateTo?: string | number,
    includeForeigners?: string | number,
    byAthlete?: string | number,
}
export type MissingRunner = {
    bibNo: string | number,
    kt: string,
    meetCode:string|number
}

export type SelectThorEvents=(options?:OptionsThorEventSelect)=>Promise<Achievements[]>
export type SelectThorAchievements=(options?:OptionsAchievementSelect)=>Promise<Achievements[]>
export type SelectMissingRunners=()=>Promise<Achievements[]>
export type SelectCompetitor=(options:OptionsCompetitorSelect)=>Promise<Achievements[]>
export type UpdateMissingRunner=(missingRunner:MissingRunner)=>Promise<string>