function makeInsertJudge (db) {
  return function insertJudge (judge, user) {
    const sql = `
      INSERT INTO judges (
        fullname,
        date,
        typeid,
        clubid,        
        _userid,
        _enabled,
        _time
      )
      VALUES ($1, $2, $3, $4, $5, true, CURRENT_TIMESTAMP(3))
      RETURNING id`

    const params = [
      judge.fullName,
      judge.date,
      judge.typeId,
      judge.clubId,
      user.id
    ]

    return db
      .query(sql, params)
      .then(res => res.rows[0].id)
  }
}

module.exports = makeInsertJudge
