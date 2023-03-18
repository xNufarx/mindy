import { Post } from '../api'
import { LoginResponse } from '../models/authentication/user'

export const Authenticate = async (
  username: string,
  password: string = ''
): Promise<LoginResponse | null> =>
  (
    await Post('/api/identity/login', {
      username,
      password
    })
  ).json()
