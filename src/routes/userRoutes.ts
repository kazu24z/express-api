import express from 'express'

import {
  userDetailController,
  userListController,
} from '@/controllers/userController'

const router = express.Router()
const base = '/users'

router.get(`${base}/`, userListController)
router.get(`${base}/:id`, userDetailController)

export default router
