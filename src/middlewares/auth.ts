import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    req.path.startsWith('/api/login') ||
    req.path.startsWith('/api/register')
  ) {
    return next()
  }
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.status(403).json({ message: 'Forbidden!' })
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY!)
    req.loginUser = decoded
    next()
  } catch {
    return res.status(401).json({ message: 'Invalid Token' })
  }
}
