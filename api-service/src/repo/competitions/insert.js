const { toTuple, flatten } = require('pg-parameterize')
function makeInsertCompetition (db) {
  return function insertCompetition (competition, user) {
    if (competition.length === 0) {
      return Promise.resolve()
    }

    const arr = competition.map(obj => [
      obj.meetId,
      obj.eventId,
      obj.ageFrom,
      obj.ageTo,
      obj.gender,
      obj.indodr
    ])

    const sql = `
    INSERT INTO competitions (
      meetid,
      eventid,
      agefrom,
      ageto,
      gender,
      indoor        
    )
    VALUES ${toTuple(arr, true)}`

    const params = flatten(arr)

    return db.query(sql, params)
  }
}

module.exports = makeInsertCompetition
