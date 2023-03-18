import { Router } from 'express'
import {
  IsAvailable,
  Login,
  Register
} from '../controllers/identity.controller'

export const identityRouter = Router()

identityRouter.post('/login', Login)
identityRouter.get('/:username/is-available', IsAvailable)
identityRouter.put('/register', Register)
