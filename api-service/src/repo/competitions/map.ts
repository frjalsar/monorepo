import { MapToCompetitions } from 'types/competition'

export const mapToCompetition: MapToCompetitions = function (row) {
  return {
    id: row.competition_id,
    meetId: row.meet_id,
    eventId: row.event_id,
    eventName: row.event_name,
    ageFrom: row.competition_agefrom,
    ageTo: row.competition_ageto,
    gender: row.competition_gender,
    indoor: row.competition_indoor
  }
}
