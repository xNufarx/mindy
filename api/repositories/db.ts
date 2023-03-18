import mongoose from 'mongoose'

/**
 * Connect to the mongoDb instance
 */
export const ConnectDb = async (uri: string): Promise<void> => {
  mongoose
    .set('strictQuery', false)
    .connect(uri)
    .then(() => console.log(`✅ Connection to ${uri} successfull`))
    .catch(err => console.log(err))
}
