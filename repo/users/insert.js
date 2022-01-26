const { genSaltSync, hashSync } = require('bcryptjs')
const uid = require('uid-safe')

function makeInsertUser (db) {
  return function insertUser (userObj, user) {
    const sql = `
      INSERT INTO users (
        fullname,        
        admin,
        application,
        clubid,
        regionid,
        token,
        username,
        password,
        _userid,
        _enabled,
        _time
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, true, CURRENT_TIMESTAMP(3)
      )
      RETURNING id`
      
    let password
    if (userObj.password) {
      const salt = genSaltSync(10)
      password = hashSync(userObj.password, salt)
    }
    const token = uid.sync(24)

    const params = [
      userObj.fullName,
      userObj.admin,
      userObj.application,
      userObj.clubId,
      userObj.regionId,
      token,
      userObj.username,
      password,
      user.id
    ]

    return db
      .query(sql, params)
      .then(res => res.rows[0].id)
  }
}

module.exports = makeInsertUser
