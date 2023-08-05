import { MapToRegistration } from 'types/registration'
import { mapToAthlete } from '../athletes/map'
import { mapToCompetition } from '../competitions/map'
export const mapToRegistration: MapToRegistration = (row) => {
  return {
    id: row.registration_id,
    note: row.registration_note,
    athleteId: row.athlete_id,
    competitionId: row.competition_id,
    athelete: row.athlete_id ? mapToAthlete(row) : undefined,
    competition: row.competition_id ? mapToCompetition(row) : undefined
  }
}
