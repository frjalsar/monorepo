
function mapRegions (list) {
  return list.map(item => {
    return {
      id: item.id,
      fullName: item.fullname,
      abbreviation: item.abbreviation,
      modified: item.modified,
      userId: item.userid,
      verified: item.verified
    }
  })
}

module.exports = mapRegions
