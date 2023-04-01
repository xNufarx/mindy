import { RequestHandler } from 'express'
import { decodeToken } from '../helpers/jwt.helpers'

export const jwtTokenDecoder: RequestHandler = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.split(' ')[1]

    if (token) {
      const decoded = decodeToken(token)
      res.locals.token = decoded
      console.debug('🔒 Jwt token decoded', decoded)
    }
  } catch (error) {
    console.error('🔒 Jwt token verication error', error)
  } finally {
    next()
  }
}

export const requireAuthentication: RequestHandler = async (req, res, next) => {
  if (res.locals.token) {
    return next()
  }

  res.sendStatus(401)
}
