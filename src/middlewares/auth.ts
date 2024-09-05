import { Request, Response, NextFunction } from 'express'

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
  const token = req.headers.authorization
  if (token && token === 'Bearer test') {
    next()
  } else {
    res.status(403).json('Forbidden!')
  }
}
