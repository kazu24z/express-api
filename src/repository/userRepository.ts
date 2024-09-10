import bcrypt from 'bcrypt'

import prisma from '@/repository/prisma'

export const getLoginUserOrThrow = async (email: string, password: string) => {
  const user = prisma.user.findUniqueOrThrow({
    where: {
      email,
    },
  })

  const isPasswordValid = await bcrypt.compare(password, (await user).password)

  if (!isPasswordValid) {
    throw new Error('Invalid Password')
  }

  return user
}

export const getUserList = async () => {
  const userList = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
  })
  return userList
}

export const getUser = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id: id },
    select: { id: true, name: true, email: true },
  })

  return user
}
