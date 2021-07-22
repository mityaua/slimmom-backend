const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config()

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json({ limit: 1000 }))
app.use(express.static(process.env.PUBLIC_DIR))

// Ответ на всех урлы, которые не заматчились
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

// app.use() // Обработчик всех ошибок - добавить

module.exports = app