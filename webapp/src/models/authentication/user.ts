export interface LoginResponse {
  accessToken: string
  renewToken: string
  user: User
}

export interface User {
  id: string
  username: string
  password: string
  email?: string
  avatar?: string
}
