function makeUpdateVenue (db) {
  return function updateVenue (venue) {
    const sql = `
      UPDATE venues SET
        fullname = $1,
        indoor = $2,
        banked = $3,
        straightlanes = $4,
        ovallanes = $5
      WHERE
        id = $6`

    const params = [
      venue.fullName,
      venue.indoor,
      venue.banked,
      venue.straightLanes,
      venue.ovalLanes,
      venue.id
    ]

    return db
      .query(sql, params)
      .then(res => res.rows)
  }
}

module.exports = makeUpdateVenue
