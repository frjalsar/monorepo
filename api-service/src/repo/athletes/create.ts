import { PoolClient } from 'pg'
import { CreateAthlete } from 'types/athlete'
import { makeInsertAthlete } from './insert'
import { makeSelectClubs } from '../clubs/select'
import { makeInsertMembership } from '../membership/insert'
import { assignMembership } from '../membership/asssign'

export type MakeEditOrCreateAthlete = (db: PoolClient, insertCompetitor) => CreateAthlete

export const makeEditOrCreateAthlete: MakeEditOrCreateAthlete = function (db, insertCompetitor) {
  return async function editAthlete (athlete, user) {
    const client = await db.connect()

    const insertAthlete = makeInsertAthlete(client)
    const selectClubs = makeSelectClubs(client)
    const insertMembership = makeInsertMembership(client)

    try {
      await client.query('BEGIN')
      const id = await insertAthlete(athlete, user)

      const membershipList = athlete.newMembership ? athlete.newMembership.map(ms => assignMembership(ms, id)) : []
      await insertMembership(membershipList, user)

      // THOR - always update Thor. TODO refactor away
      const latestClub = membershipList[membershipList.length - 1]
      if (latestClub) {
        const clubs = await selectClubs({ id: latestClub.clubId })
        if (clubs.length === 1) {
          await insertCompetitor()
        }
      }

      await client.query('COMMIT')
      return id
    } catch (e) {
      await client.query('ROLLBACK')
      throw e
    } finally {
      client.release()
    }
  }
}
