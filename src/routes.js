import express from 'express'


export const router = express.Router()


router.get('/flowers', (req, res) => {
  req.database.flowers.getAll().then(data => res.json({ data }))
})


router.get('/flowers/:flowerId', (req, res) => {
  const id = Number(req.params.flowerId)

  req.database.flowers.get(id).then(data => res.json({ data }))
})


router.get('/orders', (req, res) => {
  req.database.orders.getAll().then(data => res.json({ data }))
})

router.get('/orders/:orderId', (req, res) => {
  const id = Number(req.params.orderId)

  req.database.orders.get(id).then(data => res.json({ data }))
})