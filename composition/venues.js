function makeVenues (db) {
  const makeSelectVenues = require('../repo/venues/select')
  const makeUpdateVenue = require('../repo/venues/update')
  const makeInsertVenue = require('../repo/venues/insert')
  const makeVenuesRouter = require('../routes/venues')

  const selectVenues = makeSelectVenues(db)
  const updateVenue = makeUpdateVenue(db)
  const insertVenue = makeInsertVenue(db)

  return makeVenuesRouter(selectVenues, updateVenue, insertVenue)
}

module.exports = makeVenues
