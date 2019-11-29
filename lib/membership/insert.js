
const { toTuple, flatten } = require('pg-parameterize')

function makeInsertMembership (db) {
  return function insertMembership (membership, user) {
    console.log(membership)
    const arr = membership.map(obj => [
      obj.athleteId,
      obj.clubId,
      obj.from,
      obj.to,
      obj.legacyClub,
      obj.status,
      obj.sentBy,
      obj.sentAt,
      user.admin ? user.id : null,
      user.admin ? new Date() : null
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
      VALUES ` + toTuple(arr, true)

    const params = flatten(arr)

    return membership.length ? db.query(sql, params) : Promise.resolve()
  }
}

module.exports = makeInsertMembership
