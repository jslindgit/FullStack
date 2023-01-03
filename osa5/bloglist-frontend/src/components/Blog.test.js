import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import CreateBlogForm from './CreateBlogForm'

const blog = {
	title: 'Testblog',
	url: 'www.test.com',
	likes: 5,
	author: 'Test Author',
	username: 'testuser',
}

test('render content', () => {
	render(<Blog blog={blog} />)

	const title = screen.getByText(blog.title)
	expect(title).toBeDefined()
	const url = screen.queryByText(blog.url)
	expect(url).toBeNull()
})

test('clicking view button reveals url, likes and author', async () => {
	render(<Blog blog={blog} />)

	const user = userEvent.setup()
	const button = screen.getByText('view')
	await user.click(button)

	//screen.debug()

	const url = screen.getByText(blog.url, { exact: false })
	expect(url).toBeDefined()
	const likes = screen.getByText(blog.likes.toString(), { exact: false })
	expect(likes).toBeDefined()
	const author = screen.getByText(blog.author, { exact: false })
	expect(author).toBeDefined()
})

test('clicking the button calls event handler once', async () => {
	const mockHandler = jest.fn()

	render(<Blog blog={blog} addLike={mockHandler}/>)
	const user = userEvent.setup()

	const viewButton = screen.getByText('view')
	await user.click(viewButton)

	const likeButton = screen.getByText('Like')
	await user.click(likeButton)
	await user.click(likeButton)

	expect(mockHandler.mock.calls).toHaveLength(2)
})

test('<CreateBlogForm /> works and calls createBlog with the correct user input', async () => {
	const user = userEvent.setup()
	const mockHandler = jest.fn()

	const { container } = render(<CreateBlogForm createBlog={mockHandler} />)

	const inputTitle = container.querySelector('#input-title')
	const inputAuthor = container.querySelector('#input-author')
	const inputUrl = container.querySelector('#input-url')
	const submit = screen.getByText('create')

	await user.type(inputTitle, blog.title)
	await user.type(inputAuthor, blog.author)
	await user.type(inputUrl, blog.url)
	await user.click(submit)

	expect(mockHandler.mock.calls).toHaveLength(1)

	const call = mockHandler.mock.calls[0][0]
	expect(call.title).toBe(blog.title)
	expect(call.author).toBe(blog.author)
	expect(call.url).toBe(blog.url)
})