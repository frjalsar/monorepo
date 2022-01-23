
const { flatten, toTuple } = require('pg-parameterize')

function makeInsertCombinedEvents (db) {
  return function insertMembership (combinedEvents, user) {
    if (combinedEvents.length === 0) {
      return Promise.resolve()
    }

    const arr = combinedEvents.map(obj => [
      obj.parentEventId,
      obj.childEventId,
      user.id
    ])

    const sql = `
      INSERT INTO combinedevents(
        parenteventid,
        childeventid,
        _userid
      )
      VALUES ` + toTuple(arr, true)

    const params = flatten(arr)

    return db.query(sql, params)
  }
}

module.exports = makeInsertCombinedEvents
