const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {

  const notes = await Blog.find( { } )
  response.json(notes)
})

blogsRouter.get('/:id', async (request, response) => {

  try {
    const foundBlog = await Blog.findById(request.params.id)
    if (foundBlog) {
      response.json(foundBlog)
    } else {
      response.status(404).end()
    }
    
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

  try {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch(exception) {
    next(exception)
  }

})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch(exception) {
    next(exception)
  }

})

module.exports = blogsRouter