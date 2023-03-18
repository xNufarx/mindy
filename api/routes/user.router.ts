import { Router } from 'express'
import { Delete, GetAll } from '../controllers/user.controller'
import { requireAuthentication } from '../middlewares/identity.middleware'

export const userRouter = Router()

userRouter.get('/', requireAuthentication, GetAll)
userRouter.delete('/:id', requireAuthentication, Delete)
