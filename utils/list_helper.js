const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {

  return blogs.length === 0
    ? 0
    : blogs.reduce((cumulativeSum, blog) => cumulativeSum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {

  return blogs.length === 0
    ? { }
    : blogs.reduce((prev, current) => prev.likes > current.likes ? prev : current)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}