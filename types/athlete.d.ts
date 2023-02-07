export type Athlete = {
    id: string;
    fullName: string
    kt: string
    birthyear: number
    gender: string
    country: string
    thorId: string
    lastCompeted: Date
    club: any,
    region: any,
    membership: any[]
  }

  export type MapToAthlete = (row: any) => Athlete

export type SelectAthleteOptions = {
  id?: number | string
  typeId?: number | string
}

export type SelectAthletes = (options?: SelectAthleteOptions) => Promise<Athlete[]>
export type InsertAthlete  = (athlete: Athlete, user: any) => Promise<number>
export type UpdateAthlete  = (athlete: Athlete, user: any) => Promise<number>
export type CreateAthlete  = (athlete:Athlete,user:any)=>Promise<any>
export type EditAthlete    = (athlete:Athlete,user:any)=>Promise<any>