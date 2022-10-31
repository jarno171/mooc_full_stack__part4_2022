const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  },
  {
    title: 'Of being a Leevi',
    author: 'Leevi L. Leevinen',
    url: 'www.leevi.com',
    likes: 5000
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

test('variable id is named id, not _id', async () => {
  const response = await api.get('/api/blogs')

  response.body.map((blog) => {
    expect(blog.id).toBeDefined()
  })
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)
  expect(contents).toContain(
    'Go To Statement Considered Harmful'
  )
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Testien blogi, testausta',
    author: "testaust",
    url: "www.moi.fi",
    likes: 124,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(contents).toContain(
    'Testien blogi, testausta'
  )
})

test('blog without likes gets 0 likes', async () => {
  const newBlog = {
    title: 'Testien blogi, testausta, likes',
    url: "www.com"
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBe(0)
})

test('blog without url responds with 400', async () => {
  const newBlog = {
    title: "testausblogi",
    author: "otokka",
    likes: 8878
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('blog without title responds with 400', async () => {
  const newBlog = {
    url: "www.com",
    author: "otokka",
    likes: 8878
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('deletion of a blog', async () => {
  const blogsAtStart = (await api.get('/api/blogs')).body
  const blogsToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogsToDelete.id}`)
    .expect(204)

  const blogsAtEnd = (await api.get('/api/blogs')).body

  expect(blogsAtEnd).toHaveLength(
    blogsAtStart.length - 1
  )

  const titles = blogsAtEnd.map(r => r.title)

  expect(titles).not.toContain(blogsToDelete.title)
})

afterAll(() => {
  mongoose.connection.close()
})