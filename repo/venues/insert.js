function makeUpdateVenue (db) {
  return function updateVenue (venue, user) {
    const sql = `
      INSERT INTO venues (
        fullname,
        indoor,
        banked,
        straightlanes,
        ovallanes,
        longTripleJump,
        polevault,
        hammerDiscus,
        javelin,
        shotPut,
        material,
        constructionYear,
        renovationYear,
        warmupTrack,
        throwingField,
        certification,
        _userid,
        _enabled,
        _time,
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, true, CURRENT_TIMESTAMP(3))
      RETURNING id`

    const params = [
      venue.fullName,
      venue.indoor,
      venue.banked,
      venue.straightLanes,
      venue.ovalLanes,
      venue.longTripleJump,
      venue.polevault,
      venue.hammerDiscus,
      venue.javelin,
      venue.shotPut,
      venue.material,
      venue.constructionYear,
      venue.renovationYear,
      venue.warmupTrack,
      venue.throwingField,
      venue.certification,
      user.id      
    ]

    return db
      .query(sql, params)
      .then(res => res.rows[0].id)
  }
}

module.exports = makeUpdateVenue
