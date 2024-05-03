import express from 'express'


export const router = express.Router()


router.get('/flowers', (req, res) => {
  req.database.flowers.getAll().then(data => res.json({ data }))
})


router.get('/flowers/:flowerId', (req, res) => {
  req.database.flowers.get(req.params.flowerId).then(data => res.json({ data }))
})


router.get('/orders', (req, res) => {
  req.database.orders.getAll().then(data => res.json({ data }))
})

router.get('/orders/:orderId', (req, res) => {
  req.database.orders.get(req.params.orderId).then(data => res.json({ data }))
})