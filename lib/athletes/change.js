const makeUpdateAthlete = require('./update')
const makeDeleteMembership = require('../membership/delete')
const makeInsertMembership = require('../membership/insert')
const mapMembership = require('../membership/mapMembership')

function makeChangeAthlete (db) {
  return async function changeAthlete (athlete, user) {
    const client = await db.connect()

    const updateAthlete = makeUpdateAthlete(client)
    const removeMembership = makeDeleteMembership(client)
    const insertMembership = makeInsertMembership(client)

    try {
      await client.query('BEGIN')
      const athleteId = await updateAthlete(athlete, user)

      await removeMembership(athleteId)
      const membershipList = mapMembership(athlete.membership, athleteId)
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

module.exports = makeChangeAthlete
