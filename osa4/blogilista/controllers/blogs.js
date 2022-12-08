const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

/*blogsRouter.get('/', (req, res) => {
	res.send('Blogilista backend')
})*/

blogsRouter.delete('/:id', async (request, response, next) => {
	try {
		const blog = await Blog.findByIdAndRemove(request.params.id)
		if (blog) {
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

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})

blogsRouter.get('/:id', async (req, res, next) => {
	try {
		const blog = await Blog.findById(req.params.id)
		if (blog) {
			res.json(blog)
		}
		else {
			res.status(404).end()
		}
	}
	catch(exception) {
		next(exception)
	}
})

blogsRouter.post('/', async (request, response, next) => {
	const body = request.body

	if (!body.title || !body.url) {
		response.status(400).json({ error: 'title or url missing' })
	}
	else {
		const blog = new Blog({
			title: body.title,
			author: body.author,
			url: body.url,
			likes: body.likes || 0
		})

		try {
			const savedBlog = await blog.save()
			response.status(201).json(savedBlog)
		}
		catch(exception) {
			next(exception)
		}
	}
})

blogsRouter.put('/:id', async (req, res, next) => {
	try {
		const body = req.body

		const blog = {
			title: body.title,
			author: body.author,
			url: body.url,
			likes: body.likes,
		}

		const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
		if (updatedBlog) {
			res.status(200).json(updatedBlog)
		}
		else {
			res.status(404).json({ error: 'blog with the given id not found' })
		}
	}
	catch(exception) {
		next(exception)
	}
})

module.exports = blogsRouter