import { Request } from 'express'
import jwt from 'jsonwebtoken'

import { getLoginUserOrThrow } from '@/repository/userRepository'

export const loginService = async (req: Request) => {
  const { email, password } = req.body
  // DBに問い合わせてユーザー存在を確認
  const user = await getLoginUserOrThrow(email, password)

  if (!process.env.SECRET_KEY) {
    throw new Error('SECRET_KEY is not defined.')
  }
  const secretKey = process.env.SECRET_KEY!
  const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '24h' })
  return token
}
