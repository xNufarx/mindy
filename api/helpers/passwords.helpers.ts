import bcrypt from 'bcrypt'

const SALT_ROUNDS = 8

export const hash = async (password: string) =>
  await bcrypt.hash(password, SALT_ROUNDS)
