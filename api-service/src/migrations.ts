// Create preview domains
import * as dotenv from 'dotenv'
dotenv.config()
import { Client } from 'pg'
import { loadMigrationFiles, migrate } from 'postgres-migrations'

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

const runMigrations = async function () {
  const path = './migrations/'
  try {
    client.connect()
    await loadMigrationFiles(path)
    await migrate({ client }, path)
  } catch (e) {
    console.log(e)
  } finally {
    await client.end()
  }
}

runMigrations()
