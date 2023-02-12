import { MapToMembership } from 'types/membership'

export const mapMembership:MapToMembership = function (row, athleteId) {
  return {
    athleteId,
    clubId: row.clubId,
    legacyClub: row.clubId ? null : row.legacyClub,
    yearFrom: row.yearFrom ? row.yearFrom : null,
    yearTo: row.yearTo ? row.yearTo : null,
    confirmed: row.confirmed
  }
}
