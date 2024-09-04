import { Request, Response, NextFunction } from 'express'

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`Request URL: ${req.url}`)
  console.log(`Request Method: ${req.method}`)
  next()
}
