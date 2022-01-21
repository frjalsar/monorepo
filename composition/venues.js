function makeVenues (db) {
  const makeSelectVenues = require('../repo/venues/select')
  const makeUpdateVenue = require('../repo/venues/update')
  const makeVenuesRouter = require('../routes/venues')

  const selectVenues = makeSelectVenues(db)
  const updateVenue = makeUpdateVenue(db)

  return makeVenuesRouter(selectVenues, updateVenue)
}

module.exports = makeVenues
