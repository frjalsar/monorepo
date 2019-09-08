function mapUsers (list) {
  return list.map(user => ({
    id: user.id,
    username: user.username,
    password: user.password,
    fullName: user.fullname,
    clubId: user.clubid,
    clubAbbreviation: user.clubabbreviation,
    regionId: user.regionid,
    regionAbbreviation: user.regionabbreviation,
    admin: user.admin
  }))
}

module.exports = mapUsers
