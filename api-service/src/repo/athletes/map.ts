import { Athlete, MapToAthlete } from "types/athlete";

export const mapAthletes:MapToAthlete=function (list) {
  let currentId
  const result:Athlete[] = []
  list.forEach(item => {
    if (item.id !== currentId) {
      const atheleteObj = {
        id: item.id,
        fullName: item.fullname,
        kt: item.kt,
        birthyear: item.birthyear,
        gender: item.gender,
        country: item.country,
        thorId: item.thorid,
        lastCompeted: item.lastcompeted,
        club: {},
        region: {},
        membership: []
      }
      result.push(atheleteObj)
      currentId = item.id
    }
    const currentAthlete:Athlete = result[result.length - 1] 
    if (item.clubid || item.legacyclub) {
      // Create membership
      const membership = {
        athleteId: item.id,
        clubId: item.clubid,
        clubFullName: item.clubname,
        legacyClub: item.legacyclub,
        thorId: item.thorclubid,
        yearFrom: item.yearfrom,
        yearTo: item.yearto,
        confirmed: item.confirmed === true
      }
      currentAthlete.membership.push(membership)
      if (
        item.clubid !== null &&
        new Date().getFullYear() >= item.yearfrom &&
        (item.yearto === null || new Date().getFullYear() <= item.yearto) &&
        item.confirmed
      ) {
        currentAthlete.club = {
          id: item.clubid,
          fullName: item.clubname,
          thorId: item.thorclubid
        }
        currentAthlete.region = {
          id: item.regionid,
          fullName: item.regionfullname,
          abbreviation: item.regionabbreviation
        }
      }
    }
  })
  return result
}








