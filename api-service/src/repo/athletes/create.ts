import { mapMembership } from '../membership/map'
import { PoolClient } from 'pg'
import { CreateAthlete } from 'types/athlete'
import { makeInsertAthlete } from './insert'
import { makeSelectClubs } from '../clubs/select'
import { makeInsertMembership } from '../membership/insert'

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

      const membershipList = athlete.newMembership ? athlete.newMembership.map(member => mapMembership(member, id)) : []
      await insertMembership(membershipList, user)

      // THOR - always update Thor. TODO refactor away
      const latestClub = membershipList[membershipList.length - 1]
      const clubs = await selectClubs({ id: latestClub.clubId })
      if (clubs.length === 1) {
        await insertCompetitor()
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
