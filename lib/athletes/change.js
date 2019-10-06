const makeUpdateAthlete = require('./update')
const makeSelectMembership = require('../membership/select')
const makeDeleteMembership = require('../membership/delete')
const makeInsertMembership = require('../membership/insert')
const mapMembership = require('../membership/mapMembership')

function makeChangeAthlete (db) {
  return async function changeAthlete (athlete, user) {
    const client = await db.connect()

    const updateAthlete = makeUpdateAthlete(client)
    const selectMembership = makeSelectMembership(client)
    const removeMembership = makeDeleteMembership(client)
    const insertMembership = makeInsertMembership(client)

    try {
      await client.query('BEGIN')

      const hasPendingMembership = await selectMembership({
        athleteId: athlete.id,
        status: 0
      })

      if (user.admin) {                
        await updateAthlete(athlete, user)
        if (athlete.pendingMembership.length) {
          const membershipList = mapMembership(athlete.pendingMembership, athlete.id, 1)
          await removeMembership(athlete.id)
          await insertMembership(membershipList, user)
        }
      }

      if (!user.admin && hasPendingMembership.length === 0) {        
        await updateAthlete(athlete, user)
        if (athlete.pendingMembership.length) {
          const membershipList = mapMembership(athlete.pendingMembership, athlete.id, 0)
          await insertMembership(membershipList, user)
        }
      }

      await client.query('COMMIT')
      return { athleteId: athlete.id }
    } catch (e) {
      await client.query('ROLLBACK')
      throw e
    } finally {
      client.release()
    }
  }
}

module.exports = makeChangeAthlete
