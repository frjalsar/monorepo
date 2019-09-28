
const { toTuple, flatten } = require('pg-parameterize')

function makeInsertMembership (db) {
  return function insertMembership (membership, user) {
    const arr = membership.map(obj => [
      obj.athleteId,
      obj.clubId,
      obj.from,
      obj.to,
      obj.legacyClub,
      user.id
    ])
    const sql = `
      INSERT INTO membership(
        athleteid,
        clubid,
        fromdate,
        todate,
        legacyclub,
        modifiedby        
      )
      VALUES ` + toTuple(arr, true)

    const params = flatten(arr)

    return membership.length ? db.query(sql, params) : Promise.resolve()
  }
}

module.exports = makeInsertMembership
