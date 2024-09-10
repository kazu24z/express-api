import { getUserList, getUser } from '@/repository/userRepository'
import { Request, Response } from 'express'

export const userListService = () => {
  const userList = getUserList()
  return userList
}

export const userDetailService = (id: number) => {
  const user = getUser(id)
  return user
}
