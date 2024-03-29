import * as dotenv from 'dotenv'

import { Client } from 'pg'
import { makeInsertUser } from './repo/users/insert'
dotenv.config()

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
    const adminUser:any = {
      fullName: 'admin pr env',
      admin: true,
      application: false,
      username: 'admin',
      password: 'password123'
    }
    const user:any = { id: 1 }
    await insertUser(adminUser, user)
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
