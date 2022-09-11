// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return (
    blogs.reduce((total, blog) => total + blog.likes, 0)
  )
}

const favoriteBlog = (blogs) => {
  return(
    blogs.reduce((prev, current) => prev.likes > current.likes ? prev : current)
  )
}

const mostBlogs = (blogs) => {

  const countBy = (data, getKey) => {
    let count = {}
    for (let row of data) {
      let key = getKey(row)
      count[key] = (count[key] || 0) + 1
    }
    return count
  }
  const blogsByAuthor = countBy(blogs, row => row.author)
  const mostAmount = Object.entries(blogsByAuthor).reduce((a, b) => a[1] > b[1]? a : b)
  return { 'author': mostAmount[0], 'blogs': mostAmount[1] }
}

const mostLike = (blogs) => {
  const likesCount = {}
  blogs.forEach((blog) => {
    let key = blog.author
    likesCount[key]
      ? likesCount[key] += blog.likes
      : likesCount[key] = blog.likes
  })
  const mostLikeAmount = Object.entries(likesCount).reduce((a, b) => a[1] > b[1]? a : b)

  return { 'author': mostLikeAmount[0], 'likes': mostLikeAmount[1] }

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLike
}

