import express from 'express'


/**
 * @callback ExpressMiddleware
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */


/** @type {ExpressMiddleware} */
export async function authMiddleware(req, res, next) {
  const token = req.header('x-auth-token')

  if (!token) {
    return res.status(401).json({ error: 'У авторизації відмовлено' })
  }

  const user = await req.db.users.getByToken(token)

  if (!user) {
    return res.status(401).json({ error: 'Токен недійсний' })
  }

  req.user = user
  next()
}