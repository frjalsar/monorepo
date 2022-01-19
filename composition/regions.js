function makeRegions (db) {
  const makeSelectRegions = require('../repo/regions/select')  
  const makeUpdateRegion = require('../repo/regions/update')
  const makeRegionsRouter = require('../routes/regions')
  
  const selectRegions = makeSelectRegions(db)
  const updateRegion = makeUpdateRegion(db)

  return makeRegionsRouter(selectRegions, updateRegion)
}

module.exports = makeRegions