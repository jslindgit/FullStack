import { useState, useEffect } from 'react'

// Components:
import Blog from './components/Blog'
import CreateBlogForm from './components/CreateBlogForm'
import ErrorMessage from './components/ErrorMessage'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

// Services:
import blogService from './services/blogs'
import loginService from './services/login'

import './index.css'

const App = () => {
	const [blogs, setBlogs] = useState([])
	
	// Notifications:
	const [errorMessage, setErrorMessage] = useState(null)	
	const [notification, setNotification] = useState(null)
	
	// Login:
	const [user, setUser] = useState(null)
	const [username, setUserName] = useState('')
	const [password, setPassword] = useState('')
		
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

	const createBlog = async ({ title, author, url }) => {
		try {
			const addedBlog = await blogService.create({ title, author, url })
			setBlogs(blogs.concat(addedBlog))
		}
		catch (exception) {
			console.log('exception', exception)
		}
	}

	const loginForm = () => (
		<Togglable buttonLabel='login'>
			<LoginForm
				username={username}
				password={password}
				handleUsernameChange={({ target }) => setUserName(target.value)}
				handlePasswordChange={({ target }) => setPassword(target.value)}
				handleSubmit={handleLogin}
			/>
		</Togglable>
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
			<br />
			{ createBlogForm() }
		</div>		
	)

	const createBlogForm = () => (
		<Togglable buttonLabel='create new blog'>
			<CreateBlogForm createBlog={createBlog}	/>
		</Togglable>
	)

	return (
		<div>
			<h1>blogs</h1>

			<Notification message={notification} />
			<ErrorMessage message={errorMessage} />

			{user === null ? loginForm() :listBlogs()}
		</div>
	)
}

export default App
