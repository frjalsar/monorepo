import { genSaltSync, hashSync } from 'bcryptjs'
import { PoolClient } from 'pg'

export const makeResetPassword = function (db: PoolClient) {
  return function resetPassword (id, password) {
    const sql = `
      UPDATE users SET
        password = $1,
        _time = CURRENT_TIMESTAMP(3)
      WHERE id = $2
      RETURNING id`

    const salt = genSaltSync(10)
    password = hashSync(password, salt)

    const params = [
      password,
      id
    ]

    return db
      .query(sql, params)
      .then(res => res.rows[0].id)
  }
}
