import { RequestHandler } from 'express'
import { hasScope } from '../helpers/jwt.helpers'
import { DeleteUser, GetAllUsers } from '../services/user.service'

export const GetAll: RequestHandler = async (_req, res) => {
  const users = await GetAllUsers()
  res.send(users)
}

export const Delete: RequestHandler = async (req, res) => {
  if (!req.params.id) {
    return res.sendStatus(400)
  }

  const canDeleteUser =
    res.locals.token.sub !== req.params.id &&
    !hasScope(res.locals.token, 'admin')

  if (canDeleteUser) {
    return res.sendStatus(401)
  }

  const deleted = await DeleteUser(req.params.id)

  if (deleted) {
    return res.send()
  }

  return res.sendStatus(404)
}
