// const express = require('express');
import express from 'express'

import { loggerMiddleware } from '@/middlewares/logger'
import { authMiddleware } from '@/middlewares/auth'
import authRoutes from '@/routes/authRoutes'

import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = 3001

app.use(authMiddleware)
app.use(loggerMiddleware)
app.use(express.json())

app.use('/api', authRoutes)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
