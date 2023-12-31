require('dotenv/config')
require('express-async-errors')

const express = require('express')
const AppError = require('./utils/AppError')

const runMigrations = require('./database/sqlite/migrations')

const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const uploadConfig = require('./configs/upload')

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

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