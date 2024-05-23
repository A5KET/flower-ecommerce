import express from 'express'
import pg from 'pg'

import { Database } from './database.js'
import { router } from './routes.js'
import { FlowerRepository, OrderRepository } from './repositories.js'

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
    flowers: new FlowerRepository(database)
  }

  app.use((req, res, next) => {
    // @ts-ignore
    req.database = repositories
    next()
  })

  app.use(express.json())
  app.use('/', router)

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
  })

  process.on('exit', async function() {
    await client.end()
  })
}


startApp()