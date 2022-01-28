function makeUpdateJudgeTypes (db) {
  return function updateJudgeType (judgeType, user) {
    const sql = `
      UPDATE judgetypes SET
        name = $1,
        stage = $2,
        _userid = $3,
        _enabled = true,
        _time = CURRENT_TIMESTAMP(3)
      WHERE
        id = $4
      RETURNING id`

    const params = [
      judgeType.name,
      judgeType.stage,
      user.id,
      judgeType.id
    ]

    return db
      .query(sql, params)
      .then(res => res.rows[0].id)
  }
}

module.exports = makeUpdateJudgeTypes
