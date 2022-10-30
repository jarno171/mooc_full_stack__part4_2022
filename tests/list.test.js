const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

// list of blogs defined uglgyly inside of each describe bloc in case the lists need to be modified for later tests
// withouht breaking current tests

describe('total likes', () => {
  const listOfBlogs = [
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
    }
  ]

  const oneBlog = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5
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

describe('favorite blog', () => {
  const listOfBlogs = [
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
    {
      title: 'Testblog 123',
      author: 'Ankka A. Aku',
      url: 'https://www.dbdas.com/=SA?Zvcxcb432&¤/&#"',
      likes: 50000
    }
  ]

  const oneBlog = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5
    }
  ]

  const emptyListOfBlogs = [
  ]

  test('favorite blog of empty list is empty', () => {
    const result = listHelper.favoriteBlog(emptyListOfBlogs)
    expect(result).toEqual({ })
  })

  test('favorite blog of one blog is that blog', () => {
    const result = listHelper.favoriteBlog(oneBlog)
    expect(result).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5
     })
  })

  test('favorite blog from a list of blogs', () => {
    const result = listHelper.favoriteBlog(listOfBlogs)
    expect(result).toEqual({
      title: 'Testblog 123',
      author: 'Ankka A. Aku',
      url: 'https://www.dbdas.com/=SA?Zvcxcb432&¤/&#"',
      likes: 50000
    })
  })
})