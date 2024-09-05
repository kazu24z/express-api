import { body } from 'express-validator'

export const loginValidationRules = () => [
  body('email').isEmail().withMessage('Enter a valid email address'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 6 characters long'),
]
