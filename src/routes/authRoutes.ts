import express from 'express'

import {
  registerController,
  loginController,
  logoutController,
} from '@/controllers/authController'
import { loginValidationRules } from '@/validators/loginValidator'

const router = express.Router()

router.post('/register', registerController)
router.post('/login', loginValidationRules(), loginController)
router.post('/logout', logoutController)

export default router
