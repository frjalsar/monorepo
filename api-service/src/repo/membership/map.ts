import { MapToMembership } from 'types/membership'

export const mapToMembership: MapToMembership = function (row) {
  return {
    athleteId: row.athlete_id,
    clubId: row.club_id,
    clubFullName: row.club_fullname,
    legacyClub: row.membership_legacyclub,
    yearFrom: row.membership_yearfrom,
    yearTo: row.membership_yearto,
    confirmed: row.membership_confirmed
  }
}
