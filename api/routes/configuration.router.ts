import { Router } from 'express'
import { requireAuthentication } from '../middlewares/identity.middleware'
import {
  Configuration,
  UpdateConfigurationValue
} from './../controllers/configuration.controller'

export const configurationRouter = Router()

configurationRouter.get('/', Configuration)
configurationRouter.post(
  '/:key',
  requireAuthentication,
  UpdateConfigurationValue
)
