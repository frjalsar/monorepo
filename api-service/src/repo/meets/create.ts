
import { PoolClient } from 'pg'
import { MakeInsertCompetition } from 'repo/competitions/insert'
import { MakeInsertMeet } from './insert'
import { MakeCreateMeets } from 'types/meet'

export type MakeCreateMeet = (
  makeInsertMeet: MakeInsertMeet,
  makeInsertCompetition: MakeInsertCompetition,
  db:PoolClient,
  sendMail
) => MakeCreateMeets

export const makeCreateMeet: MakeCreateMeet = function (makeInsertMeet, makeInsertCompetition, db, sendMail) {
  return async function makeCreateMeets (meet, user) {
    const client = await db.connect()

    const insertMeet = makeInsertMeet(client)
    const insertCompetition = makeInsertCompetition(client)

    try {
      await client.query('BEGIN')
      if (meet.base64Attachment) {
        meet.attachment = Buffer.from(meet.base64Attachment, 'base64')
      }
      const meetId = await insertMeet(meet, user)

      const competitionList:Array<any> = meet.competition.map(c => ({
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
