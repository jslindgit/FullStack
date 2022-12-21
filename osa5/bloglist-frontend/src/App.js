import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [errorMessage, setErrorMessage] = useState(null)
	const [user, setUser] = useState(null)
	const [username, setUserName] = useState('')
	const [password, setPassword] = useState('')
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')
	
	useEffect(() => {
	blogService.getAll().then(blogs =>
		setBlogs( blogs )
	)  
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({ username, password })

			window.localStorage.setItem(
				'loggedBlogUser', JSON.stringify(user)
			)
			blogService.setToken(user.token)
			setUser(user)
			setUserName('')
			setPassword('')			
		}
		catch (exception) {
			console.log('exception', exception)
			setErrorMessage('wrong credentials')
			setTimeout(() => { 
				setErrorMessage(null)
			}, 5000)
		}
	}

	const handleBlogPost = async (event) => {
		event.preventDefault()
		try {
		}
		catch (exception) {
			console.log('exception', exception)
		}
	}

	const loginForm = () => (
		<div>
			<h2>Log in to application</h2>
			<form onSubmit={handleLogin}>
				<div>
					username &nbsp; 
					<input
						type="text"
						value={username}
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
			{user.realname} logged in
			<br /><br />
			{blogs.map(blog =>
			<Blog key={blog.id} blog={blog} />
			)}
			{ createBlogForm() }
		</div>		
	)

	const createBlogForm = () => (
		<div>
			<h2>create new</h2>
			<form onSubmit={handleBlogPost}>
				<div>
					title: &nbsp; 
					<input
						type="text"
						value=""
						name="Title"
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					author: &nbsp; 
					<input
						type="text"
						value=""
						name="Author"
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					url: &nbsp; 
					<input
						type="text"
						value=""
						name="URL"
						onChange={({ target }) => setUrl(target.value)}
					/>
				</div>
				<button type="submit">create</button>
			</form>
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
