
const { toOrdinal, flatten } = require('pg-parameterize')

function makeDisableMembership (db) {
  return function updateMembership (athleteId) {

    const sql = `
      UPDATE
        membership
      SET
        _enabled = false
      WHERE
        athleteid = $1`
        
    const params = [athleteId]

    return db.query(sql, params)
  }
}

module.exports = makeDisableMembership
