import { AssignMembership } from 'types/membership'

export const assignMembership: AssignMembership = function (ms, athleteId) {
  return {
    athleteId,
    clubId: ms.clubId,
    clubFullName: ms.clubFullName,
    legacyClub: ms.clubId ? null : ms.legacyClub,
    yearFrom: ms.yearFrom ? ms.yearFrom : null,
    yearTo: ms.yearTo ? ms.yearTo : null,
    confirmed: ms.confirmed
  }
}
