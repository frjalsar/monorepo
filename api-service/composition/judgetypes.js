function makeJudgeTypes (db) {
  const makeSelectJudgeTypes = require('../repo/judgetypes/select')
  const makeUpdateJudgeType = require('../repo/judgetypes/update')
  const makeInsertJudgeType = require('../repo/judgetypes/insert')
  const makeJudgeTypesRouter = require('../routes/judgetypes')

  const selectJudgeTypes = makeSelectJudgeTypes(db)
  const updateJudgeType = makeUpdateJudgeType(db)
  const insertJudgeType = makeInsertJudgeType(db)

  return makeJudgeTypesRouter(selectJudgeTypes, updateJudgeType, insertJudgeType)
}

module.exports = makeJudgeTypes
