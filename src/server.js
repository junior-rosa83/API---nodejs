require('express-async-errors')
const migrationsRun = require('./database/sqlite/migrations')
const AppError = require('./utils/AppError')

const express = require('express')
const routes = require('./routes')
const cors = require('cors')
const uploadConfig = require("./configs/upload")

migrationsRun()

const app = express()
app.use(express.json())

app.use(cors())

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER)) //O código app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER)) configura o Express para servir arquivos estáticos da pasta de uploads, permitindo acessá-los via URL que começa com /files. Isso facilita o acesso aos arquivos carregados, como imagens de avatar, diretamente do servidor.

app.use(routes)

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }

  console.error(error)

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})

const PORT = 3333
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))
