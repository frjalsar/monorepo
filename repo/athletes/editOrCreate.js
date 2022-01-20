const isEqual = require('lodash.isequal')

function makeEditOrCreateAthlete (makeUpdateOrInsertAthlete, makeDisableMembership, makeInsertMembership, db) {
  return async function editAthlete (athlete, user) {
    const client = await db.connect()

    const updateOrInsertAthlete = makeUpdateOrInsertAthlete(client)
    const disableMembership = makeDisableMembership(client)
    const insertMembership = makeInsertMembership(client)

    try {
      await client.query('BEGIN')
      
      await updateOrInsertAthlete(athlete, user)
      const sameMembership = isEqual(athlete.membership, athlete.newMembership)
      
      if (!sameMembership) {
        await disableMembership(athlete.id)
        await insertMembership(athlete.newMembership, user)
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

module.exports = makeEditOrCreateAthlete
