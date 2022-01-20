function mapClubs (list) {
  let currentId
  const result = []
  list.forEach(item => {
    if (item.id !== currentId) {
      const clubObj = {
        id: item.id,
        fullName: item.fullname,
        shortName: item.shortname,
        abbreviation: item.abbreviation,
        thorId: item.thorid,
        regionId: item.regionid,
        region: {}
      }
      result.push(clubObj)
      currentId = item.id
    }

    const current = result[result.length - 1]
    if (item.regionid) {
      const region = {
        id: item.regionid,
        fullName: item.regionname,
        abbreviation: item.regionabbreviation
      }
      current.region = region
    }
  })
  return result
}

module.exports = mapClubs
