import bcrypt from 'bcrypt'
import { createToken, getUserScope } from '../helpers/jwt.helpers'
import { UserModel } from '../repositories/user.repository'

export const IsUsernameAvailable = async (
  username: string
): Promise<boolean> => {
  return (
    (await UserModel.count({
      username
    })) === 0
  )
}

export const RegisterUser = async (
  username: string,
  password: string,
  email?: string
): Promise<void> => {
  if (!(await IsUsernameAvailable(username))) {
    throw new Error(`Username ${username} already taken`)
  }

  const nbUsers = await (await UserModel.find()).length

  const user = new UserModel({
    username,
    password,
    email,
    isAdmin: nbUsers === 0
  })

  await user.save()
  console.info(`User ${username} created`)
}

export interface AuthenticationResult {
  accessToken: string
  renewalToken: string
  user: {
    id: string
    username: string
    avatar?: string
    scope: string
  }
}

export const AuthenticateUser = async (
  username: string,
  password: string
): Promise<AuthenticationResult | null> => {
  const user = await UserModel.findOne({
    username
  })

  if (!user) {
    return null
  }

  const isMatch = bcrypt.compare(password, user.password)

  if (!isMatch) {
    return null
  }

  const token = createToken(user.toObject())
  const scope = getUserScope(user)

  return {
    accessToken: token,
    renewalToken: '',
    user: {
      id: user._id.toString(),
      username: user.username,
      avatar: user.avatar,
      scope
    }
  }
}
