function makeCreateMeet (makeInsertMeet, makeInsertCompetition, db, sendMail) {
  return async function makeCreateMeet (meet, user) {
    const client = await db.connect()

    const insertMeet = makeInsertMeet(client)
    const insertCompetition = makeInsertCompetition(client)

    try {
      await client.query('BEGIN')
      if (meet.base64Attachment) {
        meet.attachment = Buffer.from(meet.base64Attachment, 'base64')
      }           
      const meetId = await insertMeet(meet, user)

      const competitionList = meet.competition.map(c => ({
        meetId,
        eventId: c.eventId,
        ageFrom: c.ageFrom,
        ageTo: c.ageTo,
        gender: c.gender
      }))

      await insertCompetition(competitionList, user)

      await sendMail(
        'Mót skráð: ' + meet.name,
        'Sjá: <a href="https://admin.fri.is/#/umsoknir">https://admin.fri.is/#/umsoknir</a>'
      )

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
