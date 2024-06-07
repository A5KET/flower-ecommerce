import express from 'express'

import {
  flowersRouter,
  ordersRouter,
  reviewsRouter,
  authRouter,
  usersRouter
} from './routes/index.js'


export function getApp(database) {
  const app = express()

  app.use((req, res, next) => {
    req.database = database
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

  return app
}