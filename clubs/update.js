function update (db) {
  return function (obj) {
    const sql = `
      UPDATE clubs SET      
        fullname = $1,
        shortname = $2,
        abbreviation = $3,
        provinceid = $4
      WHERE
        id = $5
      RETURNING id
    `
    return db
      .query(sql, [
        obj.fullName,
        obj.shortName,
        obj.abbreviation,
        obj.province.id,
        obj.id
      ])
      .then(res => res.rows[0].id)
  }
}

module.exports = update
