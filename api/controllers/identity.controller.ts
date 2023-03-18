import { RequestHandler } from 'express'
import { LoginRequest, RegisterRequest } from '../models/dtos/identity.dto'
import {
  AuthenticateUser,
  AuthenticationResult,
  IsUsernameAvailable,
  RegisterUser
} from '../services/identity.service'

export const Login: RequestHandler<
  {},
  AuthenticationResult,
  LoginRequest
> = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.sendStatus(400)
  }

  const result = await AuthenticateUser(req.body.username, req.body.password)

  if (result) {
    console.info(`🔓 Login successfull for ${result.user.username}`)

    return res.json(result)
  }

  res.sendStatus(401)
}

export const IsAvailable: RequestHandler = async (req, res) => {
  return res.json(await IsUsernameAvailable(req.params.username))
}

export const Register: RequestHandler<{}, {}, RegisterRequest> = async (
  req,
  res
) => {
  if (!req.body.username || !req.body.password) {
    return res.sendStatus(400)
  }

  try {
    await RegisterUser(req.body.username, req.body.password, req.body.email)

    return res.send()
  } catch {
    return res.sendStatus(400)
  }
}
