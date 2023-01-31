function mapClubs (list) {
  const result = []
  list.forEach(item => {
    const clubObj = {
      id: item.id,
      fullName: item.fullname,
      shortName: item.shortname,
      abbreviation: item.abbreviation,
      thorId: item.thorid,
      regionId: item.regionid,
      region: {}
    }

    if (item.regionid !== null) {
      clubObj.region = {
        id: item.regionid,
        fullName: item.regionname,
        abbreviation: item.regionabbreviation
      }
    }
    result.push(clubObj)
  })
  return result
}

module.exports = mapClubs
