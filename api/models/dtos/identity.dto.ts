export interface LoginRequest {
  username?: string
  password?: string
}

export interface LoginResponse {
  username: string
  avatar?: string
}

export interface RegisterRequest {
  username?: string
  password?: string
  email?: string
}

export interface DeleteRequest {
  token?: string
}
