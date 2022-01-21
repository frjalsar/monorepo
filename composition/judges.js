function makeJudges (db) {
  const makeSelectJudges = require('../repo/judges/select')
  const makeUpdateJudge = require('../repo/judges/update')
  const makeInsertJudge = require('../repo/judges/insert')
  const makeJudgesRouter = require('../routes/judges')

  const selectJudges = makeSelectJudges(db)
  const updateJudge = makeUpdateJudge(db)
  const insertJudge = makeInsertJudge(db)

  return makeJudgesRouter(selectJudges, updateJudge, insertJudge)
}

module.exports = makeJudges
