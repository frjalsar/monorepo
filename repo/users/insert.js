const { genSaltSync, hashSync } = require('bcryptjs')

function makeInsertUser (db) {
  return function insertUser (user) {
    const sql = `
      INSERT INTO users (
        username,
        password,
        fullname
        clubid,
        regionid
        admin      
      ) VALUES (
        $1, $2, $3, $4, $5, $6
      )
      RETURNING id`

    // TODO: Not use sync versions
    const salt = genSaltSync(10)
    const password = hashSync(user.password, salt)

    const params = [
      user.username,
      password,
      user.clubId,
      user.admin
    ]

    return db
      .query(sql, params)
      .then(res => res.rows[0].id)
  }
}

module.exports = makeInsertUser
