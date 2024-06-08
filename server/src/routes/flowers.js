import express from 'express'


export const router = express.Router()


router.get('/flowers', (req, res) => {
  req.database.flowers.getAll().then(data => res.json({ data }))
})


router.post('/flowers', (req, res) => {
  const flower = req.body

  req.database.flowers.add(flower).then(data => res.status(201).json({ data }))
})


router.get('/flowers/:id', async (req, res) => {
  const flowerId = req.params.id
  const flower = await req.database.flowers.get(flowerId)

  if (!flower) {
    res.status(404).end()
    return
  }

  res.json({ data: flower })
})


router.put('/flowers/:id', (req, res) => {
  const flower = req.body
  flower.id = req.params.id
  console.log(flower)

  req.database.flowers.update(flower).then(() => res.end())
})


router.delete('/flowers/:id', (req, res) => {
  const flowerId = req.params.id

  req.database.flowers.delete(flowerId).then(() => res.end())
})