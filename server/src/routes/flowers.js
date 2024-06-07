import express from 'express'


export const router = express.Router()


router.get('/flowers', (req, res) => {
  req.database.flowers.getAll().then(data => res.json({ data }))
})


router.get('/flowers/:flowerId', async (req, res) => {
  const flowerId = req.params.flowerId
  const flower = await req.database.flowers.get(flowerId)

  if (!flower) {
    res.status(404).end()
    return
  }

  res.json({ data: flower })
})


router.post('/flowers', (req, res) => {
  const flower = req.body

  req.database.flowers.add(flower).then(() => res.end())
})


router.put('/flowers/:flowerId', (req, res) => {
  const flower = req.body
  flower.id = req.params.flowerId

  req.database.flowers.update(flower).then(() => res.end())
})
