export interface User {
  id: string
  username: string
  password: string
  email?: string
  avatar?: string
  scopes: string[]
}
