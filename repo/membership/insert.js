
const { toOrdinal, flatten } = require('pg-parameterize')

function makeInsertMembership (db) {
  return function insertMembership (membership, user) {
    if (membership.length === 0) {
      return Promise.resolve()
    }

    const arr = membership.map(obj => [
      obj.athleteId,
      obj.clubId,
      obj.from,
      obj.to,
      obj.legacyClub,
      obj.status,
      obj.sentBy,
      obj.sentAt,
      user.admin ? user.id : null
    ])

    const sql = `
      INSERT INTO membership(
        athleteid,
        clubid,
        fromdate,
        todate,
        legacyclub,
        status,
        sentby,
        sentat,
        confirmedby,
        confirmedat
      )
      VALUES ` + membership.map(m => {
        return '(?, ?, ?, ?, ?, ?, ?, ?, ?,' + (user.admin ? 'CURRENT_TIMESTAMP(3)' : 'NULL') + ')'
      }).join(', ')

    const params = flatten(arr)

    return db.query(toOrdinal(sql), params)
  }
}

module.exports = makeInsertMembership
