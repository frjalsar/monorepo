
const { toTuple, flatten } = require('pg-parameterize')
function insert (db) {
  return function (memberships) {
    const arr = memberships.map(obj => [obj.athleteId, obj.clubId, obj.from, obj.to])

    const sql = `
      INSERT INTO membership(
        athleteid,
        clubid,
        "from",
        "to"
      )
      VALUES ` + toTuple(arr, true)

    if (memberships.length) {
      return db.query(sql, flatten(arr)).catch(e => {
        console.log(e)
      })
    } else {
      return Promise.resolve()
    }
  }
}

module.exports = insert
