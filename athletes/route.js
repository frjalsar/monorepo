const router = require('express').Router()
const group = require('./group')
const athleteMembership = require('../membership/athleteMembership')
const pool = require('../db')

// Athletes
const createFindAthlete = require('./find')
const createSelectAthlete = require('./select')
const createInsertAthlete = require('./insert')
const createUpdateAthlete = require('./update')

const createRemoveMembership = require('../membership/remove')
const createInsertMembership = require('../membership/insert')

router.get('/', (req, res) => {
  console.log('hérna')
  const findAthlete = createFindAthlete(pool)

  return findAthlete(req.query.search).then(list => {
    const groupedList = group(list)
    res.json(groupedList)
  })
})

router.get('/:id', (req, res) => {
  const selectAthlete = createSelectAthlete(pool)
  return selectAthlete(req.params.id).then(list => {
    const groupedList = group(list)
    res.json(groupedList)
  })
})

router.post('/', async (req, res) => {
  const client = await pool.connect()
  const insertAthlete = createInsertAthlete(client)
  const removeMembership = createRemoveMembership(client)
  const insertMembership = createInsertMembership(client)

  const athlete = req.body
  try {
    await client.query('BEGIN')

    const athleteId = await insertAthlete(athlete)
    await removeMembership(athleteId)
    const membershipList = athleteMembership(athlete.clubs, athleteId)
    await insertMembership(membershipList)

    await client.query('COMMIT')
    res.json({ id: athleteId })
  } catch (e) {
    await client.query('ROLLBACK')
  } finally {
    client.release()
  }
})

router.put('/', async (req, res) => {
  const client = await pool.connect()
  const updateAthlete = createUpdateAthlete(client)
  const removeMembership = createRemoveMembership(client)
  const insertMembership = createInsertMembership(client)

  const athlete = req.body
  try {
    await client.query('BEGIN')

    const athleteId = await updateAthlete(athlete)
    await removeMembership(athleteId)
    const membershipList = athleteMembership(athlete.clubs, athleteId)
    await insertMembership(membershipList)

    await client.query('COMMIT')
    res.json({ id: athleteId })
  } catch (e) {
    await client.query('ROLLBACK')
  } finally {
    client.release()
  }
})

module.exports = router
