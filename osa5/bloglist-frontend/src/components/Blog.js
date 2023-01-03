import { useState } from 'react'

const Blog = ({ blog, addLike, user, deleteBlog }) => {
	const blogStyle = {
		padding: 10,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const [showAll, setShowAll] = useState(false)

	const blogInfo = (blog) => {
		if (showAll) {
			return (
				<div>
					{blog.url}<br />
					Likes: {blog.likes}&nbsp;
					<button onClick={async () => await addLike(blog)}>Like</button>
					<br />
					Author: {blog.author}<br />
					{removeButton(blog, user)}
				</div>
			)
		}
	}

	const removeButton = (blog, user) => {
		if (blog.user && blog.user.username === user.username) {
			return (
				<button onClick={async () => await deleteBlog(blog)}>Remove</button>
			)
		}
	}

	return (
		<div style={blogStyle}>
			{blog.title}&nbsp;&nbsp;&nbsp;
			<button onClick={() => setShowAll(!showAll)}>{showAll ? 'hide' : 'view'}</button>
			{blogInfo(blog)}
		</div>
	)
}

export default Blog