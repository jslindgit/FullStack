import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [errorMessage, setErrorMessage] = useState(null)
	const [notification, setNotification] = useState(null)
	const [user, setUser] = useState(null)
	const [username, setUserName] = useState('')
	const [password, setPassword] = useState('')
	const [title, setTitle] = useState("")
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')
	
	useEffect(() => {
	blogService.getAll().then(blogs =>
		setBlogs( blogs )
	)  
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
		if (loggedUserJSON && loggedUserJSON !== '') {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const addNotification = (message) => {
		setNotification(message)
		setTimeout(() => { 
			setNotification(null)
		}, 5000)
	}

	const addError = (message) => {
		setErrorMessage(message)
		setTimeout(() => { 
			setErrorMessage(null)
		}, 5000)
	}

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
			addNotification('logged in as ' + user.username)
		}
		catch (exception) {
			addError('wrong credentials')
		}
	}

	const handleLogout = (event) => {
		event.preventDefault()
		window.localStorage.removeItem('loggedBlogUser')
		setUser(null)
		addNotification('logged out')
	}

	const handleBlogPost = async (event) => {
		event.preventDefault()
		try {			
			const addedBlog = await blogService.create({ title, author, url })
			setTitle('')
			setAuthor('')
			setUrl('')
			setBlogs(blogs.concat(addedBlog))
			addNotification('added blog ' + addedBlog.title + ' by ' + addedBlog.author) 
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

	const logoutForm = () => (
		<>
			<form onSubmit={handleLogout}>
				<button type="submit">logout</button>
			</form>
		</>
	)

	const listBlogs = () => (
		<div>
			{user.realname} logged in { logoutForm() }
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
						value={title}
						name="Title"
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					author: &nbsp; 
					<input
						type="text"
						value={author}
						name="Author"
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					url: &nbsp; 
					<input
						type="text"
						value={url}
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

			<Notification message={notification} />
			<ErrorMessage message={errorMessage} />

			{user === null ?
				loginForm() :
				listBlogs()
			}
		</div>
	)
}

export default App
