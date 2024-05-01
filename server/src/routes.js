import express from 'express'


export const router = express.Router()


router.get('/flowers', (req, res) => {
  req.database.flowers.getAll().then(data => res.json({ data }))
})


router.get('/flowers/:id', (req, res) => {
  res.database.flowers.get(id).then(data => res.json({ data }))
}) 