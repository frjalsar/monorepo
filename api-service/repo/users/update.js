const { genSaltSync, hashSync } = require('bcryptjs')

function makeUpdatetUser (db) {
  return function insertUser (userObj, user) {
    let sql = `
      UPDATE users SET
        fullname = $1,
        admin = $2,
        application = $3,
        clubid = $4,
        regionid = $5,
        _userid = $6,
        _enabled = true,
        _time = CURRENT_TIMESTAMP(3)
      WHERE
        id = $7
      RETURNING id`

    const params = [
      userObj.fullName,
      userObj.admin,
      userObj.application,
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
