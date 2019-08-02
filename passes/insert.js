
const createQrCode = require('./createQrCode')
const uuidv4 = require('uuid/v4')

function insert (db) {
  return (athleteId) => {
    const id = uuidv4()
    const sql = `
      INSERT INTO passes (
        id,
        athleteid,
        qr,
        created,
        expires
      )
      VALUES ($1, $2, $3, CURRENT_DATE, CURRENT_DATE + interval '1 year')    
      RETURNING id
      `

    return createQrCode(id).then(buffer => {
      return db
        .query(sql, [id, athleteId, buffer])
        .then(res => res.rows[0].id)
    })
  }
}

module.exports = insert
