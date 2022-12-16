const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.delete('/:id', async (request, response, next) => {
	try {
		const user = await User.findByIdAndRemove(request.params.id)
		if (user) {
			response.status(204).end()
		}
		else {
			response.status(404).end()
		}
	}
	catch(exception) {
		next(exception)
	}
})

usersRouter.delete('/', async (request, response) => {
	await User.remove({})
	response.status(204).end()
})

usersRouter.delete('/:id', async (request, response) => {
	const user = User.findById(request.params.id)
	if (user) {
		User.findByIdAndDelete(user.id)
		return response.status(204).end()
	}
	return response.status(404).json({ error: 'id not found' })
})

usersRouter.get('/', async (request, response) => {
	const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
	response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
	try {
		const { username, realname, password } = request.body

		// Username and password validation:
		if (!username || username.length < 3 || !password || password.length < 3) {
			return response.status(400).json({ error: 'username and password must be atleast 3 characters long' })
		}
		const existingUser = await User.findOne({ username })
		if (existingUser) {
			return response.status(400).json({ error: 'username \'' + username + '\' is already taken' })
		}

		const saltRounds = 10
		const passwordhash = await bcrypt.hash(password, saltRounds)

		const blogs = []
		const user = new User({
			username,
			realname,
			passwordhash,
			blogs
		})

		const savedUser = await user.save()

		response.status(201).json(savedUser)
	}
	catch(exception) {
		next(exception)
	}
})

module.exports = usersRouter