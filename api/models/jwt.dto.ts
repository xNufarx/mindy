import { JwtPayload } from 'jsonwebtoken'

export interface AppJwtPayLoad extends JwtPayload {
  scope: string
}
