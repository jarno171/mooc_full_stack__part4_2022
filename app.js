const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const blogsRouter = require('./controller/blogs')
const app = express()
const middleware = require('./utils/middleware')

const config = require('./utils/config')

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app