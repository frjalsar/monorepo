function insert (db) {
  return function (obj) {
    const sql = `
      INSERT INTO clubs (
        fullname,
        shortname,        
        abbreviation,
        provinceid
      )
      VALUS ($1, $2, $3, $4)
      RETURNING id
    `
    return db.query(sql, [
      obj.fullName,
      obj.shortName,
      obj.abbreviation,
      obj.province.id
    ])
  }
}
