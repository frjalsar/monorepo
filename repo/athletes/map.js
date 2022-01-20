function mapAthletes (list) {
  let currentId
  const result = []
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
        membership: [],
      }
      result.push(atheleteObj)
      currentId = item.id
    }

    const currentAthlete = result[result.length - 1]
    if (item.clubid || item.legacyclub) {
      // Create membership
      const membership = {
        athleteId: item.id,
        clubId: item.clubid,
        clubFullName: item.clubname,
        legacyClub: item.legacyclub,
        from: item.yearfrom,
        to: item.yearto,
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

module.exports = mapAthletes
