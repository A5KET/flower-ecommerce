import express from 'express'


export const router = express.Router()


router.get('/users', (req, res) => {
  req.database.users.getAll().then(data => res.json({ data }))
})


router.get('/users/:id', async (req, res) => {
  const userId = req.params.id
  const user = await req.database.users.get(userId)

  if (!user) {
    res.status(404).end()
    return 
  }

  res.json({ data: user })
})


router.put('/users/:id/password', (req, res) => {
  const { password } = req.body
  const userId = req.params.id
  
  req.database.users.updatePassword(userId, password).then(() => res.end())
})


router.delete('/users/:id', (req, res) => {
  const userId = req.params.id

  req.database.users.delete(userId).then(() => res.end())
})