import express from 'express'

import { FlowerInMemoryRepository, OrderInMemoryRepository } from './repositories.js'
import { router } from './routes.js'


const repositories = {
  flowers: new FlowerInMemoryRepository(),
  orders: new OrderInMemoryRepository()
}


function startApp(db) {
  const app = express()
  const PORT = 3000

  app.use((req, res, next) => {
    req.database = db
    next()
  })

  app.use('/', router)

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
  })
}


startApp(repositories)