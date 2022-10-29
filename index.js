//received this in an email

//const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controller/blogs')
const mongoose = require('mongoose')
const logger = require('./utils/logger')

const config = require('./utils/config')

mongoose.connect(config.MONGODB_URI)

//const server = http.createServer(app)

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})