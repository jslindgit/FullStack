const Blog = require('../models/blog')

const initialBlogs = [
	{
		title: 'Jest Blog',
		author: 'Teppo Testaaja',
		url: 'https://www.teppo.fi/blogi',
		likes: 13
	},
	{
		title: 'Supertest for dummies',
		author: 'Tiina Testaaja',
		url: 'https://www.supertest4dummies.fi',
		likes: 5315
	}
]

const nonExistingId = async () => {
	const blog = new Blog({ title: 'willremovethissoon', date: new Date() })
	await blog.save()
	await blog.remove()

	return blog._id.toString()
}

const blogsInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map(blog => blog.toJSON())
}

module.exports = {
	initialBlogs, nonExistingId, blogsInDb
}