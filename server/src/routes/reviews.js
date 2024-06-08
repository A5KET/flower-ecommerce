import express from 'express'


export const router = express.Router()


router.get('/reviews', (req, res) => {
  req.database.reviews.getAll().then(data => res.json({ data }))
})


router.post('/reviews', (req, res) => {
  const review = req.body

  req.database.reviews.add(review).then(data => res.status(201).json({ data }))
})


router.get('/reviews/:id', async (req, res) => {
  const reviewId = req.params.id
  const review = await req.database.reviews.get(reviewId)

  if (!review) {
    res.status(404).end()
    return
  }

  res.json({ data: review })
})


router.put('/reviews/:id', (req, res) => {
  const review = req.body
  review.id = req.params.id

  req.database.reviews.update(review).then(() => res.end())
})


router.delete('/reviews/:id', (req, res) => {
  const id = req.params.id

  req.database.reviews.delete(id).then(() => res.end())
})