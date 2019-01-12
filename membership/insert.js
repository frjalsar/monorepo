
const { toTuple, flatten } = require('pg-parameterize')
function insert (db) {
  return function (memberships) {
    const arr = memberships.map(obj => [obj.athleteId, obj.clubId, obj.from, obj.to, obj.legacyTeam])

    const sql = `
      INSERT INTO membership(
        athleteid,
        clubid,
        fromdate,
        todate,
        legacyteam
      )
      VALUES ` + toTuple(arr, true)

    if (memberships.length) {
      return db.query(sql, flatten(arr))
    } else {
      return Promise.resolve()
    }
  }
}

module.exports = insert
