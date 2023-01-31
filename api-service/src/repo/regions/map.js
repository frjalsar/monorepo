
function mapRegions (list) {
  return list.map(item => {
    return {
      id: item.id,
      fullName: item.fullname,
      abbreviation: item.abbreviation,
      modified: item.modified,
      userId: item.userid
    }
  })
}

module.exports = mapRegions
