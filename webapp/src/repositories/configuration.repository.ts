import { Get } from '../api'
import { ApplicationConfiguration } from '../models/configuration'

export const GetConfiguration = async (): Promise<ApplicationConfiguration> =>
  (await Get('/api/config')).json()
