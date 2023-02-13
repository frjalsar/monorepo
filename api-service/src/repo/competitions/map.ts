import { MapToCompetitions } from 'types/competition'

export const mapCompetitions: MapToCompetitions = function (item) {
  return {
    id: item.id,
    meetId: item.meetid,
    eventId: item.eventid,
    ageFrom: item.agefrom,
    ageTo: item.ageto,
    gender: item.gender,
    indoor: item.indoor
  }
}
