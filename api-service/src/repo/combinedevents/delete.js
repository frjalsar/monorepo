function makeDeleteCombinedEvents (db) {
  return function deleteCombinedEvents (parentEventId) {
    const sql = `
      DELETE FROM
        combinedevents
      WHERE
         parenteventid = $1`

    const params = [parentEventId]

    return db
      .query(sql, params)
  }
}

module.exports = makeDeleteCombinedEvents
