export interface LoginResponseDto {
  accessToken: string
  renewToken: string
  user: UserDto
}

export interface UserDto {
  id: string
  username: string
  password: string
  email?: string
  avatar?: string
  scope: string
}
