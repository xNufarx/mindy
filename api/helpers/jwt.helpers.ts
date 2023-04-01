import { sign, verify } from 'jsonwebtoken'
import { HydratedDocument } from 'mongoose'
import { AppJwtPayLoad } from '../models/jwt.dto'
import { UserEntity } from '../repositories/user.repository'

const SECRET_KEY = process.env.JWT_SECRET_KEY || ''

export const createToken = (user: HydratedDocument<UserEntity>) =>
  sign(
    {
      sub: user._id.toString(),
      scope: getUserScope(user)
    } as AppJwtPayLoad,
    SECRET_KEY,
    {
      expiresIn: '1 days'
    }
  )

export const getUserScope = (user: HydratedDocument<UserEntity>): string =>
  [user.isAdmin ? 'admin' : ''].join(' ')

export const hasScope = (payload: AppJwtPayLoad, scope: string): boolean =>
  payload.scope
    .toLocaleLowerCase()
    .split(' ')
    .includes(scope.toLocaleLowerCase())

export const decodeToken = (token: string) =>
  verify(token, SECRET_KEY) as AppJwtPayLoad
