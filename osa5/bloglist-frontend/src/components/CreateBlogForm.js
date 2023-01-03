import { useState } from 'react'

const CreateBlogForm = ({ createBlog }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const addBlog = (event) => {
		event.preventDefault()
		createBlog({ title, author, url })

		setTitle('')
		setAuthor('')
		setUrl('')
	}

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={addBlog}>
				<div>
					title: &nbsp;
					<input
						type="text"
						value={title}
						name="Title"
						onChange={({ target }) => setTitle(target.value)}
						id="input-title"
					/>
				</div>
				<div>
					author: &nbsp;
					<input
						type="text"
						value={author}
						name="Author"
						onChange={({ target }) => setAuthor(target.value)}
						id="input-author"
					/>
				</div>
				<div>
					url: &nbsp;
					<input
						type="text"
						value={url}
						name="URL"
						onChange={({ target }) => setUrl(target.value)}
						id="input-url"
					/>
				</div>
				<button type="submit">create</button>
			</form>
		</div>
	)
}

export default CreateBlogForm