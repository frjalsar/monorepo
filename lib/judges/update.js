function makeUpdateJudge (db) {
  return function updateJudge (judge) {
    const sql = `
      UPDATE judges SET
        fullname = $1,
        date = $2,
        clubid = $3        
      WHERE
        id = $4`

    const params = [
      judge.fullName,
      judge.date,
      judge.clubId,
      judge.id
    ]

    return db
      .query(sql, params)
      .then(res => res.rows)
  }
}

module.exports = makeUpdateJudge
