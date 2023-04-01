import { UserDto } from '../models/dtos/user.dto'
import { UserModel } from '../repositories/user.repository'

export const DeleteUser = async (id: string): Promise<boolean> => {
  const user = await UserModel.findOne({
    _id: id
  })

  if (!user) {
    console.log(`User not found with id ${id}`)
    return false
  }

  await user.deleteOne()

  console.log(`User ${id} deleted`)
  return true
}

export const GetAllUsers = async (): Promise<UserDto[]> =>
  (await UserModel.find()).map(u => ({
    id: u._id.toString(),
    username: u.username,
    avatar: u.avatar
  }))
