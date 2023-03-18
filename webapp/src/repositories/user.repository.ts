import { Delete, Get } from '../api'
import { UserDto } from '../models/user'

export const GetAllUsers = async (): Promise<UserDto[]> =>
  (await Get('/api/user')).json()

export const DeleteUser = async (userId: string): Promise<boolean> =>
  await (
    await Delete(`/api/user/${userId}`)
  ).ok
