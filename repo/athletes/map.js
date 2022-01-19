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
        lastCompeted: item.lastcompeted,
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
        sentAt: item.sentat,
        sentBy: item.sentby,
        sentByName: item.userfullname,
        confirmed: item.status === 1,
        confirmedAt: item.confirmedat,
        confirmedBy: item.confirmedby
      }
      
      currentAthlete.membership.push(membership)
      
      // Set current club  and region
      if (
        item.clubid !== null &&
        startOfToday().getTime() >= new Date(item.fromdate).getTime() &&
        (!item.todate || startOfToday().getTime() <= new Date(item.todate).getTime())
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
