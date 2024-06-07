import express from 'express'
import pg from 'pg'

import { Database } from './database.js'
import {
  flowersRouter,
  ordersRouter,
  reviewsRouter,
  authRouter,
  usersRouter
} from './routes/index.js'
import { 
  FlowerRepository,
  OrderFlowersRepository,
  OrderRepository,
  UserRepository,
  SessionRepository,
  ReviewRepository
} from './repositories.js'
import { generateSHA256HexEncryption, generateToken } from './hash.js'

const { Client } = pg


function getRepositories(database) {
  const flowers = new FlowerRepository(database)
  const orderFlowers = new OrderFlowersRepository(database)
  const orders = new OrderRepository(database, orderFlowers)
  const reviews = new ReviewRepository(database)
  const users = new UserRepository(database, generateSHA256HexEncryption)
  const sessions = new SessionRepository(database, generateToken)

  const repositories = {
    flowers,
    orders,
    reviews,
    users,
    sessions
  }

  return repositories
}


async function startApp() {
  const app = express()
  const PORT = 3000

  const client = new Client({
    connectionString: process.env.PGSTRING
  })

  await client.connect()
  const db = new Database(client)
  const repositories = getRepositories(db)

  await db.createTables()

  app.use((req, res, next) => {
    req.database = repositories
    next()
  })

  app.use(express.json())
  app.use('/',
    authRouter,
    flowersRouter,
    ordersRouter,
    reviewsRouter,
    usersRouter
  )

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
  })

  process.on('exit', async function() {
    await client.end()
  })
}


startApp()