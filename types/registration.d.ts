import { Athlete } from 'types/athlete'
import { Competition } from 'types/competition'

export type Registration = {
        id?: number,
        competitionId: number,
        athleteId: number,
        note: number,
        athelete?: Athlete,
        competition?: Competition,
}

export type MapToRegistration = (row: any) => Registration

export type SelectRegistarationOptions = {
  atheleteid?: number | string,
  competitionid?: number | string,
  id?: number | string
}

export type SelectRegistrations = (opt?: SelectRegistarationOptions) => Promise<Registration[]>
export type InsertRegistrations = (registration: Registration) => Promise<number>
export type UpdateRegistrations = (id: number | string, registration: Registration) => Promise<number>
export type DeleteRegistrations = (id: number| string) => Promise<number>
