import { sign, verify } from 'jsonwebtoken'
import { HydratedDocument } from 'mongoose'
import { AppJwtPayLoad } from '../models/jwt.dto'
import { UserEntity } from '../repositories/user.repository'

const SECRET_KEY = process.env.JWT_SECRET_KEY || ''

export const createToken = (user: HydratedDocument<UserEntity>) =>
  sign(
    {
      id: user._id.toString(),
      username: user.username,
      isAdmin: user.isAdmin ?? false
    } as AppJwtPayLoad,
    SECRET_KEY,
    {
      expiresIn: '1 days'
    }
  )

export const decodeToken = (token: string) =>
  verify(token, SECRET_KEY) as AppJwtPayLoad
