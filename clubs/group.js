function group (list) {
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
        provinceId: item.provinceid,
        province: {}
      }
      result.push(clubObj)
      currentId = item.id
    }

    const current = result[result.length - 1]
    if (item.provinceid) {
      const province = {
        id: item.provinceid,
        fullName: item.provincename,
        abbreviation: item.provinceabbr
      }
      current.province = province
    }
  })
  return result
}

module.exports = group
