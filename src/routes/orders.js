import express from 'express'


export const router = express.Router()


router.get('/orders', (req, res) => {
  req.database.orders.getAll().then(data => res.json({ data }))
})


router.get('/orders/:orderId', (req, res) => {
  const id = req.params.orderId

  req.database.orders.get(id).then(data => res.json({ data }))
})


router.post('/orders', (req, res) => {
  const data = req.body.data

  req.database.orders.add(data).then(res.status(201).end())
})


router.put('/orders/:orderId', (req, res) => {
  const order = req.body.data

  req.database.orders.update(order).then(() => res.end())
})


router.delete('/orders/:orderId', (req, res) => {
  const orderId = req.params.orderId

  req.database.orders.delete(orderId).then(() => res.end())
})