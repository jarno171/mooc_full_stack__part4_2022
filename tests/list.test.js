const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listOfBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a6762aaa17f8',
      title: 'Of being a Leevi',
      author: 'Leevi L. Leevinen',
      url: 'www.leevi.com',
      likes: 5000,
      __v: 0
    }
  ]

  const oneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const emptyListOfBlogs = [
  ]
  
  test('sum of empty list is zero', () => {
    const result = listHelper.totalLikes(emptyListOfBlogs)
    expect(result).toBe(0)
  })

  test('likes of one blog equal the likes of that blog', () => {
    const result = listHelper.totalLikes(oneBlog)
    expect(result).toBe(5)
  })

  test('sum of likes of bloglist equal to the sum of the likes', () => {
    const result = listHelper.totalLikes(listOfBlogs)
    expect(result).toBe(5005)
  })

})