// const express = require('express');
import express from 'express'
import { loggerMiddleware } from '@/middlewares/logger'
import { authMiddleware } from '@/middlewares/auth'

const app = express()
const port = 3001

app.use(authMiddleware)
app.use(loggerMiddleware)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public', { index: false })) // '/'へのアクセス時の挙動→index.htmlを読み込まないようにしている

app.post('/login', (req, res) => {
  const data = req.body
  const email: string = 'test@example.com'
  const password: string = 'password'

  if (data.email === email && data.password === password) {
    return res.json({ token: 'Bearer test' })
  } else {
    return res.status(401).json({ message: 'unauthorized' })
  }
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// JSONを処理
app.post('/data', (req, res) => {
  const data = req.body
  console.log(data)

  const response = {
    name: data.name,
    age: data.age,
    description: 'He is good boy!!',
  }

  res.json(response) // res.json()とすることで確実にJSONで返してくれる（application/json）
})

// formデータを処理
app.post('/submit-form', (req, res) => {
  const formData = req.body
  console.log(req.body)

  res.send('Form data received successfully')
})

// クエリパラメータの処理
app.get('/search', (req, res) => {
  const query = req.query.tool
  console.log(req.query) // req.queryでクエリパラメータをオブジェクトで取得できる

  console.log(`urlパス部分:${req.url}`)

  res.send(`Search tool ${query}`)
})

// ルートパラメータの処理
app.get('/users/:id', (req, res) => {
  const userId = req.params.id // req.paramsでルートに含まれる値をオブジェクトで取得できる
  console.log(req.params)

  res.send(`User ID: ${userId}`)
})

app.get('/', (req, res) => {
  res.send('Welcome to the Express app')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
