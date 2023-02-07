export type Achievement = {
    Grein:string|number,
    Röð:string|number,
    Árangur:string|number,
    Metrar:string|number,
    Tími:string|number,
    Vindur:string|number,
    Úti_Inni:string|number,
    Keppandanúmer:string|number,
    Nafn:string|number,
    Félag:string|number,
    Kyn:string|number,
    Dagsetning?:string|number,
    Mót?:string|number,
    Staður?:string|number
}


export type SelectThorEventOptions = {
    gender:any,
    outside:any
}
export type SelectCompetitorOptions = {
    kt:string
}

export type SelectAchievementOptions = {
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


export type UpdateThorCompetitor = {
    id?: number | string,
    clubName?: number | string,
    fullName?: number|string
}

export type SelectThorEvents=(options?:SelectThorEventOptions)=>Promise<Achievement[]>
export type SelectThorAchievements=(options?:SelectAchievementOptions)=>Promise<Achievement[]>
export type SelectMissingRunners=()=>Promise<Achievement[]>
export type SelectCompetitor=(options:SelectCompetitorOptions)=>Promise<Achievement[]>
export type UpdateMissingRunner=(missingRunner:MissingRunner)=>Promise<string>
export type UpdateCompetitor=(id:UpdateThorCompetitor, clubName:UpdateThorCompetitor, fullName:UpdateThorCompetitor)=>Promise<number>