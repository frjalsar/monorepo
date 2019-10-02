const format = require('date-fns/format')
const startOfToday = require('date-fns/startOfToday')

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
        club: {},
        region: {},
        membership: [],
        pendingMembership: []
      }
      result.push(atheleteObj)
      currentId = item.id
    }

    const currentAthlete = result[result.length - 1]
    if (item.clubid || item.legacyclub) {
      // Create membership
      const membership = {
        clubId: item.clubid,
        clubFullName: item.clubname,
        legacyClub: item.legacyclub,
        from: item.fromdate ? format(item.fromdate, 'yyyy-MM-dd') : null,
        to: item.todate ? format(item.todate, 'yyyy-MM-dd') : null,
        modifiedAt: item.modifiedat,
        modifiedBy: item.modifiedby,
        modifiedByName: item.userfullname
      }

      // Default or confirmed
      if (item.status === -1 || item.status === 1) {
        currentAthlete.membership.push(membership)
      } else {
        currentAthlete.pendingMembership.push(membership)
      }

      // Set current club  and region
      if (
        !!item.clubid &&
        startOfToday().getTime() >= new Date(item.fromdate).getTime() &&
        (!item.todate || startOfToday().getTime() <= new Date(item.todate).getTime())
      ) {
        currentAthlete.club = {
          id: item.clubid,
          fullName: item.clubname,
          confirmed: item.status === 1
        }

        currentAthlete.region = {
          id: item.regionid,
          fullName: item.regionfullname,
          abbreviation: item.regionabbreviation,
          confirmed: item.status === 1
        }
      }
    }
  })
  return result
}

module.exports = mapAthletes
