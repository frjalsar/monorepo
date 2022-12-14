require('dotenv').config()
const { Client } = require('pg')
const makeInsertUser = require('./repo/users/insert')

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

const runSeed = async function () {
  client.connect()
  // User
  const insertUser = makeInsertUser(client)
  try {
    const adminUser = {
      fullName: 'admin pr env',
      admin: true,
      application: false,
      username: 'admin',
      password: 'password123'
    }
    await insertUser(adminUser, { id: 1 })
  // Athlete
  } catch (e) {
    console.log('error')
    console.log(e)
  } finally {
    console.log('end')
    await client.end()
  }
}
runSeed()
