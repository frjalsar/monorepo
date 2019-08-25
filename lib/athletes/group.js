function group (list) {
  let currentId
  const result = []
  list.forEach(item => {
    if (item.id !== currentId) {
      const atheleteObj = {
        id: item.id,
        fullName: item.fullname,
        ssnr: item.ssnr,
        birthyear: item.birthyear,
        gender: item.gender,
        country: item.country,
        thorId: item.thorid,
        confirmedByUser: item.confirmedbyuser,
        membership: []
      }
      result.push(atheleteObj)
      currentId = item.id
    }

    const currentAthlete = result[result.length - 1]
    if (item.clubid || item.legacyteam) {
      const fromDate = new Date(item.fromdate)
      const toDate = new Date(item.todate)

      const club = {
        id: item.clubid,
        fullName: item.clubname,
        legacyTeam: item.legacyteam,
        from: item.fromdate ? fromDate.getFullYear() + '-' + (fromDate.getMonth() + 1) + '-' + fromDate.getDate() : null,
        to: item.todate ? toDate.getFullYear() + '-' + (toDate.getMonth() + 1) + '-' + toDate.getDate() : null,
        current: !item.todate
      }
      currentAthlete.membership.push(club)
    }
  })
  return result
}

module.exports = group
