const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

describe('when there is initially some blog saved', () => {

  test('notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('identifier by default is id', async () => {
    const blogs = await Blog.find({})
    expect(blogs[0].id).toBeDefined()
  })
})


describe('addition of a new blog', () => {

  test('new blogs can be posted successfully', async () => {
    const newBlog = {
      title: 'New blog Testing',
      author: 'Test Author',
      url:'http://testing.testi',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain(
      'New blog Testing'
    )
  })

  test('likes missing and is default as 0', async () => {
    const newBlog = {
      title: 'New blog Likes Testing',
      author: 'Missing Likes',
      url:'http://testing.testi'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)

    const blogsAtEnd = await helper.blogsInDB()
    const newAddedBlog = await blogsAtEnd.find(blog => blog.title === 'New blog Likes Testing')
    expect(newAddedBlog.likes).toBe(0)
  })

  test('title and url missing, bad request respond with 400', async () => {
    const newBlog = {
      author: 'Missing Title and Url',
      likes: 3
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

})


describe('deletion of a blog', () => {

  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDB()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).not.toContain(blogToDelete.title)
  })

})


describe('update blog', () => {

  test('a exist blog can be update', async () => {
    const blogsAtStart = await helper.blogsInDB()
    const blogToUpdate = blogsAtStart[0]
    const updateLikes = {
      ...blogToUpdate,
      likes: 9 }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updateLikes)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    const blogUpdated = blogsAtEnd[0]
    expect(blogUpdated.likes).toBe(9)

  })
})



afterAll(() => {
  mongoose.connection.close()
})