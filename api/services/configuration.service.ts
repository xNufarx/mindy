import { ConfigurationDto } from '../models/dtos/configuration.dto'
import { ConfigurationRepository } from './../repositories/configuration.repository'
import { UserModel } from './../repositories/user.repository'

export const GetConfiguration = async (): Promise<ConfigurationDto> => {
  const nbUser = (await UserModel.find()).length
  const canRegister = await ConfigurationRepository.CanRegister.get()

  return {
    CanRegister: nbUser === 0 || canRegister,
    MustRegister: nbUser === 0
  }
}

export const UpdateConfiguration = async (
  key: string,
  value: string | number | boolean
): Promise<boolean> => {
  switch (key) {
    case 'CanRegister':
      if (typeof value !== 'boolean') {
        return false
      }

      try {
        await ConfigurationRepository.CanRegister.set(value)
      } catch {
        return false
      }
      break

    default:
      return false
  }

  return true
}
