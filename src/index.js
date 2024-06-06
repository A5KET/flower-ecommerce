import express from 'express'
import pg from 'pg'

import { Database } from './database.js'
import { router as authRouter } from './routes/auth.js'
import { router as mainRouter } from './routes/main.js'
import { FlowerRepository, OrderRepository, SessionRepository, UserRepository } from './repositories.js'
import { getSHA256HexEncryption, generateToken } from './hash.js'

const { Client } = pg


async function startApp() {
  const app = express()
  const PORT = 3000

  const client = new Client({
    connectionString: process.env.CONNECTION_STRING
  })
  await client.connect()

  const database = new Database(client)
  const repositories = {
    orders: new OrderRepository(database),
    flowers: new FlowerRepository(database),
    users: new UserRepository(database, getSHA256HexEncryption),
    sessions: new SessionRepository(database, generateToken)
  }

  app.use((req, res, next) => {
    req.database = repositories
    next()
  })

  app.use(express.json())
  app.use('/', authRouter)
  app.use('/', mainRouter)

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
  })

  process.on('exit', async function() {
    await client.end()
  })
}


startApp()