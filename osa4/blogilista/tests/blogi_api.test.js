const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
	await Blog.deleteMany({})
	let blogObject = new Blog(helper.initialBlogs[0])
	await blogObject.save()
	blogObject = new Blog(helper.initialBlogs[1])
	await blogObject.save()
})

afterAll(() => {
	mongoose.connection.close()
})

test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
	const response = await api.get('/api/blogs')

	expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
	const response = await api.get('/api/blogs')
	const titles = response.body.map(r => r.title)

	expect(titles).toContain('Jest Blog')
})

test('a valid blog can be added', async () => {
	const newBlog = {
		title: 'a blog',
		author: 'me',
		url: 'https://localhost',
		likes: '100'
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const blogsAtEnd = await helper.blogsInDb()
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

	const titles = blogsAtEnd.map(r => r.title)
	expect(titles).toContain('a blog')
})

test('a blog without a value for \'likes\' gets 0 likes as that value', async () => {
	const newBlog = {
		title: 'a blog without likes value',
		author: 'no-one',
		url: 'some url',
	}

	const response = await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)

	expect(response.body.likes).toBe(0)
})

test('a blog without title or url returns 400 Bad Request', async () => {
	const noTitle = {
		author: 'tester',
		url: 'some url',
		likes: 1
	}
	const noUrl = {
		title: 'blog with no url',
		author: 'url hater',
		likes: 2
	}

	await api
		.post('/api/blogs')
		.send(noTitle)
		.expect(400)

	await api
		.post('/api/blogs')
		.send(noUrl)
		.expect(400)
})

test('blog contains property \'id\'', async () => {
	const blog = {
		title: 'some blog containing an id property',
		author: 'some author',
		url: 'some url',
		likes: 1000000
	}

	const response = await api
		.post('/api/blogs')
		.send(blog)
		.expect(201)

	expect(response.body.id).toBeDefined()
})

test('a blog can be deleted', async () => {
	const response = await api.get('/api/blogs')
	const blogs = response.body
	const idToDel = blogs[0].id

	await api
		.del('/api/blogs/' + idToDel)
		.expect(204)
})

test('a blog can be updated', async () => {
	const blog = {
		title: 'updated blog',
		author: 'updater test',
		url: 'www.updated.com',
		likes: '111'
	}

	const response = await api.get('/api/blogs')
	const blogs = response.body
	const idToUpdate = blogs[0].id

	await api
		.put('/api/blogs/' + idToUpdate)
		.send(blog)
		.expect(200)
})