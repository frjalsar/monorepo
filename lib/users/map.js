function mapUsers (list) {
  return list.map(user => ({
    id: user.id,
    username: user.username,
    password: user.password,
    fullName: user.fullname,
    clubId: user.clubid,
    regionId: user.regionid,
    admin: user.admin
  }))
}

module.exports = mapUsers
