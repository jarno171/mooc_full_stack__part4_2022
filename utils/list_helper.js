const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {

  return blogs.length === 0
    ? 0
    : blogs.reduce((cumulativeSum, blog) => cumulativeSum + blog.likes, 0)
}

module.exports = {
  dummy,
  totalLikes
}