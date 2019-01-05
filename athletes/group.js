function group (list) {
  let currentId
  const result = []
  list.forEach(item => {
    if (item.id !== currentId) {
      const atheleteObj = {
        id: item.id,
        fullName: item.fullname,
        ssnr: item.ssnr,
        clubs: []
      }
      result.push(atheleteObj)
      currentId = item.id
    }

    const currentAthlete = result[result.length - 1]
    const club = {
      id: item.clubid,
      name: item.clubname,
      from: item.from,
      to: item.to,
      active: !item.to
    }
    currentAthlete.clubs.push(club)
  })
  return result
}

module.exports = group
