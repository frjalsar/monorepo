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
      const membershipList =  mapMembership(athlete.newMembership, athlete.id)

       // THOR - always update Thor. TODO refactor away
       const latestClub = membershipList[membershipList.length - 1] 
       const clubs = await selectClubs({ id: latestClub.clubId })
       if (clubs.length === 1)
       {          
         await clubTransfer(athlete.thorId, club[0].thorid)        
       }
      
      if (!sameMembership) {
        await disableMembership(athlete.id)        
        await insertMembership(membershipList, user)       
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
