import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import bcrypt from 'bcrypt'

import { loginService } from '@/service/authService'

export const registerController = async (req: Request, res: Response) => {
  // 面倒なのでコントローラに実装
  const { name, email, password } = req.body
  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const prisma = new PrismaClient()
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    })
    console.log(user)
  } catch {
    return res.status(400).json({ error: 'register failed' })
  }
  return res.json({ message: 'register successful' })
}

export const loginController = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty) {
    return res.status(400).json({ errors: errors.array() })
  }

  const token: string = await loginService(req)

  return res.json({ token })
}
export const logoutController = (req: Request, res: Response) => {
  return res.json('logout')
}
