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
        membership: []
      }
      result.push(atheleteObj)
      currentId = item.id
    }

    const currentAthlete = result[result.length - 1]
    if (item.clubid || item.legacyclub) {
      const club = {
        id: item.clubid,
        fullName: item.clubname,
        legacyClub: item.legacyclub,
        from: item.fromdate ? format(item.fromdate, 'yyyy-MM-dd') : null,
        to: item.todate ? format(item.todate, 'yyyy-MM-dd') : null,
        regionId: item.regionid,
        current: startOfToday().getTime() >= new Date(item.fromdate).getTime() && (!item.todate || startOfToday().getTime() <= new Date(item.todate).getTime())
      }

      if (club.current) {
        currentAthlete.club = club
      }
      
      currentAthlete.membership.push(club)
    }
  })
  return result
}

module.exports = mapAthletes
