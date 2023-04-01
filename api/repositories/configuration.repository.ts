import { model, Schema } from 'mongoose'

export interface Config {
  key: string
  value: string
}

export const ConfigurationSchema = new Schema<Config>({
  key: { type: String, required: true },
  value: { type: String, required: true }
})

export const ConfigurationModel = model<Config>(
  'Configuration',
  ConfigurationSchema
)

const ParameterProxy = <
  T extends string | number | boolean,
  U extends T | undefined = T
>(
  key: string,
  fallback: T
) => ({
  get: async (): Promise<T | U> => {
    const rawValue = (await ConfigurationModel.findOne({ key }))?.value

    if (rawValue) {
      return JSON.parse(rawValue)
    }

    return fallback
  },
  set: async (value: T) => {
    let parameter = await ConfigurationModel.findOneAndUpdate(
      { key },
      { value: JSON.stringify(value) }
    )

    if (!parameter) {
      parameter = new ConfigurationModel({
        key,
        value: JSON.stringify(value)
      })
    }

    await parameter.save()
    console.info(`New configuration value for ${key} : ${value}`)
  }
})

export const ConfigurationRepository = {
  CanRegister: ParameterProxy<boolean, boolean>('CanRegister', false)
}
