function makeRegions (db) {
  const makeSelectRegions = require('../repo/regions/select')
  const makeUpdateRegion = require('../repo/regions/update')
  const makeInsertRegion = require('../repo/regions/insert')
  const makeRegionsRouter = require('../routes/regions')

  const selectRegions = makeSelectRegions(db)
  const updateRegion = makeUpdateRegion(db)
  const insertRegion = makeInsertRegion(db)

  return makeRegionsRouter(selectRegions, updateRegion, insertRegion)
}

module.exports = makeRegions
