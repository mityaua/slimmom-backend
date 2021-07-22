// Файл для подключения к базе данных
const mongoose = require('mongoose')
const URI = process.env.DB_HOST

// Подключение к базе
const db = async () => {
  return await mongoose.connect(URI,
    {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    }
  )
}

// Консолит подключение к базе
mongoose.connection.on('connected', (_) => {
  console.log('Database connection successful')
})

// Консолит ошибку при коннекте + завершает процесс
mongoose.connection.on('error', err => {
  console.error(`Database connection error: ${err.code}`)
  process.exit(1)
})

// Консолит отключение от базы
mongoose.connection.on('disconnected', (_) => {
  console.log('Database disconnected')
})

// Отключение от базы при событии SIGINT (ctrl + C)
process.on('SIGINT', async () => {
  console.info('\x1b[36m%s\x1b[0m', 'Connection for DB disconnected and app terminated')
  process.exit(1)
})

module.exports = db