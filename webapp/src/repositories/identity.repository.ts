import { Get, Post, Put } from '../api'
import { LoginResponseDto } from '../models/dtos/indentity.dtos'

export const Authenticate = async (
  username: string,
  password: string = ''
): Promise<LoginResponseDto | null> => {
  const response = await Post('/api/identity/login', {
    username,
    password
  })

  if (!response.ok) {
    return null
  }

  return response.json()
}

export const IsUsernameAvailable = async (username: string): Promise<boolean> =>
  (await Get(`/api/identity/${username}/is-available`)).json()

export const RegisterQuery = async (
  username: string,
  password: string
): Promise<boolean> =>
  (
    await Put('/api/identity/register', {
      username,
      password
    })
  ).ok
