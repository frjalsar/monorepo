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
    if (item.clubid) {
      const club = {
        id: item.clubid,
        name: item.clubname,
        from: new Date(item.from).getFullYear(),
        to: new Date(item.to).getFullYear(),
        active: !item.to
      }
      currentAthlete.clubs.push(club)
    }
  })
  return result
}

module.exports = group
