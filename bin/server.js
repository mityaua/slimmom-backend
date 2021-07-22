const app = require('../app')
const db = require('../db')

const PORT = process.env.PORT || 4000

// Старт сервера с подключением к базе
const server = async () => {
  try {
    await db()

    app.listen(PORT, async () => {
      console.log(`Server running. Use our API on: http://localhost:${PORT}`)
    })
  } catch (err) {
    console.log(`Server not running. Error message: ${err.message}`)
  }
}

server()