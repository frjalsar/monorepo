function makeUpdateJudge (db) {
  return function updateJudge (judge, user) {
    const sql = `
      UPDATE judges SET
        fullname = $1,
        date = $2,
        clubid = $3,
        _userid = $4,
        _enabled = true,
        _time = CURRENT_TIMESTAMP(3)
      WHERE
        id = $5
      RETURNING id`

    const params = [
      judge.fullName,
      judge.date,
      judge.clubId,
      user.id,
      judge.id
    ]

    return db
      .query(sql, params)
      .then(res => res.rows[0].id)
  }
}

module.exports = makeUpdateJudge
