import express from 'express'

import { areDefined } from '../utils.js'


export const router = express.Router()


router.post('/signup', async (req, res) => {
  const { email, username, password } = req.body

  if (!areDefined(email, username, password)) {
    return res.status(400).json({ error: 'Потрібна електронна пошта, ім\'я користувача та пароль' })
  }

  const userData = { email, username, password }

  const user = await req.db.users.add(userData)
  const session = await req.db.sessions.update(user.id)

  req.status(201).json({ data: { token: session.token, user: { name: user.name } } })
})


router.post('/signin', async (req, res) => {
  const { email, password } = req.body

  if (!areDefined(email, password)) {
    return res.status(400).json({ error: 'Потрібна електронна адреса та пароль' })
  }

  const user = await req.db.users.get(email, password)

  if (!user) {
    return res.status(401).json({ error: 'Невірна адреса електронної пошти або пароль' })
  }

  const session = await req.db.sessions.update(user.id)

  res.json({ data: { token: session.token, user: { name: user.name } } })
})