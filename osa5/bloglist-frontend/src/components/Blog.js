import { useState } from 'react'

const Blog = ({ blog, addLike, user, deleteBlog }) => {
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
		if (!user) {
            return null
        }
		
		if (blog.user &&
				(JSON.stringify(blog.user.username) === JSON.stringify(user.username)
				|| (blog.user === user.id))) {
			return (
				<button onClick={async () => await deleteBlog(blog)}>Remove</button>
			)
		}
		else {
			return null
		}
	}

	return (
		<div className='blog'>
			{blog.title}&nbsp;&nbsp;&nbsp;
			<button onClick={() => setShowAll(!showAll)}>{showAll ? 'hide' : 'view'}</button>
			{blogInfo(blog)}
		</div>
	)
}

export default Blog