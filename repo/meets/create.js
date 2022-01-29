function makeCreateMeet (makeInsertMeet, makeInsertCompetition, db) {
  return async function makeCreateMeet (meet, user) {
    const client = await db.connect()

    const insertMeet = makeInsertMeet(client)
    const insertCompetition = makeInsertCompetition(client)

    try {
      await client.query('BEGIN')
      const meetId = await insertMeet(meet, user)

      const competitionList = meet.events.map(eventId => ({
        meetId,
        eventId
      }))

      await insertCompetition(competitionList, user)

      await client.query('COMMIT')
      return { meetId }
    } catch (e) {
      await client.query('ROLLBACK')
      throw e
    } finally {
      client.release()
    }
  }
}

module.exports = makeCreateMeet
