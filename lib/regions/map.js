
function mapRegions (list) {
  return list.map(item => {
    const isVerified = !(item.verifieduserid === null && item.verifieddate === null)
    return {
      id: item.id,
      fullName: item.fullname,
      abbreviation: item.abbreviation,
      verified: isVerified,
      verification: isVerified ? {
        date: item.verifieddate,
        userId: item.verifieduserid,
        userFullName: item.userfullname
      } : undefined
    }
  })
}

module.exports = mapRegions
