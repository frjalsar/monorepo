
function mapRegions (list) {
  return list.map(item => {
    return {
      id: item.id,
      fullName: item.fullname,
      abbreviation: item.abbreviation,
      modifiedAt: item.modifiedat,
      modifiedBy: item.modifiedby
    }
  })
}

module.exports = mapRegions
