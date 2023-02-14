import { MapToRegistration } from 'types/registration'

export const mapToRegistration: MapToRegistration = (row) => {
  return {
    id: row.id,
    note: row.note,
    athleteId: row.athleteid,
    competitionId: row.competitionid,
    athelete: row.athleteid
      ? {
          id: row.athleteid,
          fullName: row.fullname,
          thorId: row.thorid,
          country: row.country,
          gender: row.gender,
          birthyear: row.birthyear,
          kt: row.kt
        }
      : undefined,
    competition: row.competitionid
      ? {
          id: row.competitionid,
          meetId: row.meetid,
          eventId: row.eventid,
          ageTo: row.ageto,
          ageFrom: row.agefrom
        }
      : undefined
  }
}
