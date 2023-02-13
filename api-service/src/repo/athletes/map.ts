import { Athlete, MapToAthlete } from 'types/athlete'
import { Club } from 'types/club'
import { Membership } from 'types/membership'
import { Region } from 'types/region'
import { mapToMembership } from '../membership/map'
import { mapToRegion } from '../regions/map'
import { mapToClubPartial } from '../clubs/map'

export const mapToAthlete: MapToAthlete = function (row) {
  return {
    id: row.athlete_id,
    fullName: row.athlete_fullname,
    kt: row.athlete_kt,
    birthyear: row.athlete_birthyear,
    gender: row.athlete_gender,
    country: row.athlete_country,
    thorId: row.athlete_thorid,
    lastCompeted: row.athlete_lastcompeted,
    club: {} as Partial<Club>,
    region: {} as Region,
    membership: [] as Membership[]
  }
}

export const mapAthletes = function (list) {
  let currentId
  const result: Athlete[] = []
  list.forEach(item => {
    if (item.athlete_id !== currentId) {
      const atheleteObj: Athlete = mapToAthlete(item)
      result.push(atheleteObj)
      currentId = item.athlete_id
    }

    const currentAthlete: Athlete = result[result.length - 1]
    if (item.club_id || item.membership_legacyclub) {
      const membership: Membership = mapToMembership(item)
      currentAthlete.membership.push(membership)

      if (
        item.club_id !== null &&
        new Date().getFullYear() >= item.membership_yearfrom &&
        (item.membership_yearto === null || new Date().getFullYear() <= item.membership_yearto) &&
        item.membership_confirmed
      ) {
        currentAthlete.club = mapToClubPartial(item)
        currentAthlete.region = mapToRegion(item)
      }
    }
  })
  return result
}
