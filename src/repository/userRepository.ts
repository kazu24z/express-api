import bcrypt from 'bcrypt'

import prisma from '@/repository/prisma'

export const getLoginUserOrThrow = async (email: string, password: string) => {
  const user = prisma.user.findUniqueOrThrow({
    where: {
      email,
    },
  })

  // パスワードの検証
  const isPasswordValid = await bcrypt.compare(password, (await user).password)

  if (!isPasswordValid) {
    throw new Error('Invalid Password')
  }

  return user
}
