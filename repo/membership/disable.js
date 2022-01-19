
const { toOrdinal, flatten } = require('pg-parameterize')

function makeDisableMembership (db) {
  return function updateMembership (athleteId) {
    if (membership.length === 0) {
      return Promise.resolve()
    }

    const sql = `
      UPDATE
        membership
      SET
        _enabled = false
      WHERE
        athleteid = $1`
        
    const params = [ath]

    return db.query(sql, params)
  }
}

module.exports = makeDisableMembership
