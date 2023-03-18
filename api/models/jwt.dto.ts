import { JwtPayload } from 'jsonwebtoken'

export interface AppJwtPayLoad extends JwtPayload {
  id: string
  username: string
  isAdmin: boolean
}
