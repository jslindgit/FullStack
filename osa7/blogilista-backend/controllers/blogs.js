const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.delete('/:id', async (request, response) => {
    if (!request.token) {
        return response.status(401).json({ error: 'token missing' })
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'invalid token' })
    }
    const blog = await Blog.findById(request.params.id)

    if (blog) {
        if (blog.user.toString() === request.user.id) {
            blog.delete()
            response.status(204).end()
        } else {
            response.status(401).json({ error: 'user id mismatch' }).end()
        }
    } else {
        response.status(404).end()
    }
})

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {
        username: 1,
        realname: 1,
        id: 1,
    })
    response.json(blogs)
})

blogsRouter.get('/:id', async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id)
        if (blog) {
            res.json(blog)
        } else {
            res.status(404).end()
        }
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.post('/', async (request, response, next) => {
    if (!request.token) {
        return response.status(401).json({ error: 'token missing' })
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'invalid token' })
    }

    const body = request.body

    if (!body.title || !body.url) {
        response.status(400).json({ error: 'title or url missing' })
    } else {
        const user = await User.findById(decodedToken.id)

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes || 0,
            user: user.id,
        })

        try {
            const savedBlog = await blog.save()
            user.blogs = user.blogs.concat(savedBlog)
            await user.save()
            response.status(201).json(savedBlog)
        } catch (exception) {
            next(exception)
        }
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    try {
        const body = request.body

        const blog = {
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            comments: body.comments,
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            request.params.id,
            blog,
            {
                new: true,
            }
        )
        if (updatedBlog) {
            response.status(200).json(updatedBlog)
        } else {
            response
                .status(404)
                .json({ error: 'blog with the given id not found' })
        }
    } catch (exception) {
        next(exception)
    }
})

module.exports = blogsRouter
