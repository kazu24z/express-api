import { userListService, userDetailService } from '@/service/userService'
import { Request, Response } from 'express'

export const userListController = async (req: Request, res: Response) => {
  const userList = await userListService()
  return res.json({ items: userList })
}

export const userDetailController = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)

  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid ID' })
  }

  const userDetail = await userDetailService(id)

  if (!userDetail) {
    return res.status(400).json({ message: 'User Not Found' })
  }

  return res.json({ items: userDetail })
}
