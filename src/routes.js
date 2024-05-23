// @ts-nocheck
import express from 'express'
import { NotFoundError } from './errors.js'


export const router = express.Router()


router.get('/flowers', (req, res) => {
  req.database.flowers.getAll()
    .then(data => res.json({ data }))
})


router.get('/flowers/:flowerId', (req, res) => {
  const id = req.params.flowerId

  req.database.flowers.get(id)
    .then(data => res.json({ data }))
    .catch(error => {
      if (error instanceof NotFoundError) {
        res.status(404).end()
      }
    })
})


router.get('/orders', (req, res) => {
  req.database.orders.getAll().then(data => res.json({ data }))
})


router.get('/orders/:orderId', (req, res) => {
  const id = req.params.orderId

  req.database.orders.get(id).then(data => res.json({ data }))
})


router.post('/orders', (req, res) => {
  const data = req.body.data

  req.database.orders.add(data).then(res.sendStatus(200))
})