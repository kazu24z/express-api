import jwt from 'jsonwebtoken'

declare module 'express-serve-static-core' {
  interface Request {
    loginUser: string | jwt.JwtPayload
  }
}
