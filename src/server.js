const express = require('express')
require('express-async-errors')

const AppError = require('./utils/AppError')

const runMigrations = require('./database/sqlite/migrations')

const app = express()
app.use(express.json())

const routes = require('./routes')

app.use(routes)

runMigrations()

app.use((err, req, res, next) => {
  if(err instanceof AppError) {
    res.status(400).json({
      status: 'error',
      message: err.message
    })
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})

const PORT = 5555;
app.listen(PORT, () => console.log(`Server is running in port: ${PORT}`));