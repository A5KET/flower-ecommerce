import pg from 'pg'

import { Database } from './src/database.js'
import { 
  FlowerRepository,
  OrderFlowersRepository,
  OrderRepository,
  UserRepository,
  SessionRepository,
  ReviewRepository
} from './src/repositories.js'
import { generateSHA256HexEncryption, generateToken } from './src/hash.js'
import { getApp } from './src/app.js'


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
  const PORT = 3000
  const client = new pg.Client({ connectionString: process.env.PGSTRING })
  const db = new Database(client)
  const repositories = getRepositories(db)
  const app = getApp(repositories)


  await client.connect()
  await db.createTables()
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
  })

  process.on('exit', async function() {
    await client.end()
  })
}


startApp()