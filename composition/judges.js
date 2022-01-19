function makeJudges (db) {
  const makeSelectJudges = require('../repo/judges/select')  
  const makeUpdateJudge = require('../repo/judges/update')
  const makeJudgesRouter = require('../routes/judges')
  
  const selectJudges = makeSelectJudges(db)
  const updateJudge = makeUpdateJudge(db)

  return makeJudgesRouter(selectJudges, updateJudge)
}

module.exports = makeJudges