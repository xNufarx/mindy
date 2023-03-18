import { ApplicationConfiguration } from '../models/configuration'

export const GetConfiguration = async (): Promise<ApplicationConfiguration> => {
  return {
    CanRegister: false
  }
}
