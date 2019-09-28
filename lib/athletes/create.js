const makeInsertAthlete = require('./insert')
const makeDeleteMembership = require('../membership/delete')
const makeInsertMembership = require('../membership/insert')
const mapMembership = require('../membership/mapMembership')

function makeCreateAthlete (db) {
  return async function createAthlete (athlete, user) {
    const client = await db.connect()

    const insertAthlete = makeInsertAthlete(client)
    const removeMembership = makeDeleteMembership(client)
    const insertMembership = makeInsertMembership(client)

    try {
      await client.query('BEGIN')
      const athleteId = await insertAthlete(athlete, user)

      await removeMembership(athleteId)
      const membershipList = mapMembership(athlete.clubs, athleteId)
      await insertMembership(membershipList, user)

      await client.query('COMMIT')
      return { athleteId }
    } catch (e) {
      await client.query('ROLLBACK')
      throw e
    } finally {
      client.release()
    }
  }
}

module.exports = makeCreateAthlete
