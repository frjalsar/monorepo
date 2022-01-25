const { genSaltSync, hashSync } = require('bcryptjs')

function makeUpdatetUser (db) {
  return function insertUser (userObj, user) {
    let sql = `
      UPDATE users SET
        fullname = $1,
        admin = $2,
        clubid = $3,
        regionid = $4,
        _userid = $5,
        _enabled = true,
        _time = CURRENT_TIMESTAMP(3)
      WHERE
        id = $6
      RETURNING id`

    const params = [
      userObj.fullName,
      userObj.admin,
      userObj.clubId,
      userObj.regionId,
      user.id,
      userObj.id
    ]    

    return db
      .query(sql, params)
      .then(res => res.rows[0].id)
  }
}

module.exports = makeUpdatetUser
