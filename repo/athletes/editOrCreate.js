const isEqual = require('lodash.isequal')
const mapMembership = require('../membership/mapMembership')

function makeEditOrCreateAthlete (makeUpdateOrInsertAthlete, makeSelectClubs, makeDisableMembership, makeInsertMembership, db, clubTransfer) {
  return async function editAthlete (athlete, user) {
    const client = await db.connect()

    const updateOrInsertAthlete = makeUpdateOrInsertAthlete(client)
    const selectClubs = makeSelectClubs(client)
    const disableMembership = makeDisableMembership(client)
    const insertMembership = makeInsertMembership(client)

    try {
      await client.query('BEGIN')
      
      await updateOrInsertAthlete(athlete, user)
      const sameMembership = isEqual(athlete.membership, athlete.newMembership)
      
      if (!sameMembership) {
        await disableMembership(athlete.id)
        const membershipList =  mapMembership(athlete.newMembership, athlete.id)
        await insertMembership(membershipList, user)

        // THOR
        const latestClub = membershipList[membershipList.length - 1] 
        const club = await selectClubs({ id: latestClub.clubId })
        if (club.length === 1)
        {          
          await clubTransfer(athlete.thorId, club[0].thorid)        
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

module.exports = makeEditOrCreateAthlete
