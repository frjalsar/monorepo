import { isEqual } from 'lodash.isequal'
import { PoolClient } from 'pg'
import { EditAthlete } from 'types/athlete'
import { makeUpdateAthlete } from './update'
import { makeSelectClubs } from '../clubs/select'
import { makeDisableMembership } from '../membership/disable'
import { makeInsertMembership } from '../membership/insert'
import { assignMembership } from '../membership/asssign'

export type MakeEditAthlete = (db: PoolClient, updateCompetitor) => EditAthlete

export const makeEditAthlete: MakeEditAthlete = function (db, updateCompetitor) {
  return async function editAthlete (athlete, user) {
    const client = await db.connect()

    const updateAthlete = makeUpdateAthlete(client)
    const selectClubs = makeSelectClubs(client)
    const disableMembership = makeDisableMembership(client)
    const insertMembership = makeInsertMembership(client)

    try {
      await client.query('BEGIN')
      await updateAthlete(athlete, user)

      const sameMembership = isEqual(athlete.membership, athlete.newMembership)
      const membershipList = athlete.newMembership ? athlete.newMembership.map(ms => assignMembership(ms, athlete.id)) : []

      if (!sameMembership) {
        await disableMembership(athlete.id)
        await insertMembership(membershipList, user)
      }

      // THOR - always update Thor. TODO refactor away
      const latestClub = membershipList[membershipList.length - 1]
      const clubs = await selectClubs({ id: latestClub.clubId })
      if (clubs.length === 1) {
        await updateCompetitor(athlete.thorId, clubs[0].thorId, athlete.fullName)
      }

      await client.query('COMMIT')
      return athlete.id
    } catch (e) {
      await client.query('ROLLBACK')
      throw e
    } finally {
      client.release()
    }
  }
}
