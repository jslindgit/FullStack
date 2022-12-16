const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')

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

const getInitialUsers = async () => {
	const initialUsers = [
		{
			username: 'teppo',
			realname: 'Teppo Testaaja',
			passwordhash: '',
			blogs: [ ]
		},
		{
			username: 'tiina',
			realname: 'Tiina Testaaja',
			passwordhash: '',
			blogs: [ ]
		},
	]
	let pwdHash = await bcrypt.hash('trustno1', 10)
	initialUsers[0].passwordhash = pwdHash
	pwdHash = await bcrypt.hash('trustno2', 10)
	initialUsers[1].passwordhash = pwdHash

	return initialUsers
}

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

const usersInDb = async () => {
	const users = await User.find({})
	return users.map(user => user.toJSON())
}

module.exports = {
	initialBlogs, getInitialUsers, nonExistingId, blogsInDb, usersInDb
}