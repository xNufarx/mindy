import { AppJwtPayLoad } from '../models/jwt.dto'

declare global {
  namespace Express {
    interface Locals {
      token: AppJwtPayLoad
    }
  }
}
