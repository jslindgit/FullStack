import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [errorMessage, setErrorMessage] = useState(null)
	const [user, setUser] = useState(null)
	const [userName, setUserName] = useState('')
	const [password, setPassword] = useState('')
	
	useEffect(() => {
	blogService.getAll().then(blogs =>
		setBlogs( blogs )
	)  
	}, [])

	const handleLogin = (event) => {
		event.preventDefault()
		console.log('logging in with', userName, password)
	}

	const loginForm = () => (
		<div>
			<h2>Log in to application</h2>
			<form onSubmit={handleLogin}>
				<div>
					username &nbsp; 
					<input
						type="text"
						value={userName}
						name="Username"
						onChange={({ target }) => setUserName(target.value)}
					/>
				</div>
				<br />
				<div>
					password &nbsp;
					<input
						type="password"
						value={password}
						name="Password"
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<br />
				<button type="submit">login</button>
			</form>
		</div>
	)

	const listBlogs = () => (
		<div>
			{blogs.map(blog =>
			<Blog key={blog.id} blog={blog} />
			)}
		</div>
	)

	return (
		<div>
			<h1>blogs</h1>

			<Notification message={errorMessage} />

			{user === null ?
				loginForm() :
				listBlogs()
			}
		</div>
	)
}

export default App
