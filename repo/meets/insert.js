function makeInsertMeet (db) {
  return function insertMeet (meet, user) {
    const sql = `
      INSERT INTO meets (
        name,
        organizername,
        organizerkt,
        contactname,
        contactemail,
        contactphone,
        location,
        venueid,
        judgeid,
        startdate,
        enddate,
        status,
        sent,
        _userid,
        _enabled,
        _time
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, CURRENT_TIMESTAMP(3), $13, true, CURRENT_TIMESTAMP(3)
      )
      RETURNING id`

    const params = [
      meet.name,
      meet.organizerName,
      meet.organizerKt,
      meet.contactName,
      meet.contactEmail,
      meet.contactPhone,
      meet.location,
      meet.venueId,
      meet.judgeId,
      meet.startDate,
      meet.endDate || meet.startDate,
      0,
      user.id
    ]

    return db
      .query(sql, params)
      .then(res => res.rows[0].id)
  }
}

module.exports = makeInsertMeet
