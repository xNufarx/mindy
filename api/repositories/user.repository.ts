import { model, Schema } from 'mongoose'
import { hash } from '../helpers/passwords.helpers'

export interface UserEntity {
  username: string
  password: string
  email?: string
  avatar?: string
  isAdmin?: true
}

export const UserSchema = new Schema<UserEntity>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: String,
  avatar: String,
  isAdmin: Boolean
}).pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await hash(this.password)
  }
  next()
})

export const UserModel = model<UserEntity>('User', UserSchema)
