const mapJudgeTypes = require('./map')

function makeSelectJudgeTypes (db) {
  return function selectJudgeTypes () {
    const params = []
    const sql = `
      SELECT
        jt.id,
        jt.name,
        jt.stage
      FROM
        judgetypes jt
      ORDER BY
        jt.stage ASC,
        jt.name ASC`

    return db
      .query(sql, params)
      .then(res => mapJudgeTypes(res.rows))
  }
}

module.exports = makeSelectJudgeTypes
