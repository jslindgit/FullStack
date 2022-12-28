import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('render content', () => {
	const blog = {
		title: 'Testblog',
		url: 'www.test.com',
		likes: 5,
	}

	render(<Blog blog={blog} />)

	const title = screen.getByText('Testblog')
	expect(title).toBeDefined()
	const url = screen.queryByText('www.test.com')
	expect(url).toBeNull()
})