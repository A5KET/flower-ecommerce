import express from 'express'


export const router = express.Router()


router.get('/orders', (req, res) => {
  req.database.orders.getAll().then(data => res.json({ data }))
})


router.post('/orders', (req, res) => {
  const order = req.body
  console.log(order)

  req.database.orders.add(order).then(data => res.status(201).json({ data }))
})


router.get('/orders/:id', (req, res) => {
  const id = req.params.id

  req.database.orders.get(id).then(data => res.json({ data }))
})


router.put('/orders/:id', (req, res) => {
  const id = req.params.id
  const order = req.body
  order.id = id

  req.database.orders.update(order).then(() => res.end())
})


router.delete('/orders/:id', (req, res) => {
  const id = req.params.id

  req.database.orders.delete(id).then(() => res.end())
})