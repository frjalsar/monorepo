function group (list) {
  let currentId
  const result = []
  list.forEach(item => {
    if (item.id !== currentId) {
      const atheleteObj = {
        id: item.id,
        fullName: item.fullname,
        birthyear: item.birthyear,
        gender: item.gender,
        country: item.country,
        verified: item.verified,
        thorId: item.thorid,
        clubs: []
      }
      result.push(atheleteObj)
      currentId = item.id
    }

    const currentAthlete = result[result.length - 1]
    if (item.fromdate) {
      const fromDate = new Date(item.fromdate)
      const toDate = new Date(item.todate)
      const club = {
        id: item.clubid,
        name: item.clubname,
        from: fromDate.getFullYear() + '-' + (fromDate.getMonth() + 1) + '-' + fromDate.getDate(),
        to: item.todate ? toDate.getFullYear() + '-' + (toDate.getMonth() + 1) + '-' + toDate.getDate() : null,
        current: !item.todate
      }
      currentAthlete.clubs.push(club)
    }
  })
  return result
}

module.exports = group
