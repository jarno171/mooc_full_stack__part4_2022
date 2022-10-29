const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const blogsRouter = require('./controller/blogs')
const app = express()

const config = require('./utils/config')

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app