function makeUpdateJudge (db) {
  return function updateJudge (judge, user) {
    const sql = `
      UPDATE judges SET
        fullname = $1,
        date = $2,
        typeId = $3,
        clubid = $4,
        _userid = $5,
        _enabled = true,
        _time = CURRENT_TIMESTAMP(3)
      WHERE
        id = $6
      RETURNING id`

    const params = [
      judge.fullName,
      judge.date,
      judge.typeId,
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
