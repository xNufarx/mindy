import { Router } from 'express'
import { Status } from '../controllers/root.controller'

export const rootRouter = Router()

rootRouter.get('/status', Status)
