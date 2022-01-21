const mapMembership = require('../membership/mapMembership')

function makeEditOrCreateAthlete (makeInsertAthlete, makeSelectClubs, makeDisableMembership, makeInsertMembership, db, insertCompetitor) {
  return async function editAthlete (athlete, user) {
    const client = await db.connect()

    const insertAthlete = makeInsertAthlete(client)
    const selectClubs = makeSelectClubs(client)
    const insertMembership = makeInsertMembership(client)

    try {
      await client.query('BEGIN')
      console.log('athlete', athlete)
      const id = await insertAthlete(athlete, user)
            
      const membershipList = mapMembership(athlete.newMembership, id)
      await insertMembership(membershipList, user)

       // THOR - always update Thor. TODO refactor away
       const latestClub = membershipList[membershipList.length - 1] 
       const clubs = await selectClubs({ id: latestClub.clubId })
       if (clubs.length === 1)
       {
         await insertCompetitor()
       }

      await client.query('COMMIT')
      return { athleteId: id }
    } catch (e) {
      await client.query('ROLLBACK')
      throw e
    } finally {
      client.release()
    }
  }
}

module.exports = makeEditOrCreateAthlete
