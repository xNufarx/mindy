import { RequestHandler } from 'express'
import {
  GetConfiguration,
  UpdateConfiguration
} from '../services/configuration.service'

export const Configuration: RequestHandler = async (_req, res) => {
  res.json(await GetConfiguration())
}

export const UpdateConfigurationValue: RequestHandler<
  { key: string },
  {},
  { value: string | number | boolean }
> = async (req, res) => {
  if (!req.params.key) {
    return res.status(400).send()
  }

  const updated = await UpdateConfiguration(req.params.key, req.body.value)

  if (!updated) {
    return res.status(400).send()
  }

  res.status(200).send()
}
