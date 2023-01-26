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
    const [user, setUser] = useState(null)
    const [blogs, setBlogs] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)
    const [notification, setNotification] = useState(null)

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs))
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
        if (loggedUserJSON && loggedUserJSON !== '') {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    // Notifications:
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

    // Actions:
    const login = async ({ username, password }) => {
        try {
            const returnedUser = await loginService.login({
                username,
                password,
            })

            window.localStorage.setItem(
                'loggedBlogUser',
                JSON.stringify(returnedUser)
            )
            blogService.setToken(returnedUser.token)
            setUser(returnedUser)
            addNotification('logged in as ' + returnedUser.username)
            return true
        } catch (exception) {
            addError('wrong credentials')
            return false
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
        } catch (exception) {
            console.log('createBlog exception', exception)
        }
    }

    const addLike = async (blog) => {
        try {
            const updatedBlog = await blogService.addLike(blog)
            setBlogs(
                blogs
                    .sort((a, b) => b.likes - a.likes)
                    .map((b) => (b.id !== updatedBlog.id ? b : updatedBlog))
            )
        } catch (exception) {
            console.log('addLike exception', exception)
        }
    }

    const deleteBlog = async (blog) => {
        try {
            if (window.confirm('Delete blog ' + blog.title)) {
                await blogService.deleteBlog(blog)
                setBlogs(blogs.filter((b) => b.id !== blog.id))
                addNotification(blog.title + ' removed')
            }
        } catch (exception) {
            console.log('deleteBlog exception', exception)
        }
    }

    // Forms:
    const loginForm = () => (
        <Togglable buttonLabel="login">
            <LoginForm login={login} />
        </Togglable>
    )

    const logoutForm = () => (
        <>
            <form onSubmit={handleLogout}>
                <button type="submit">logout</button>
            </form>
        </>
    )

    const createBlogForm = () => (
        <Togglable buttonLabel="create new blog">
            <CreateBlogForm createBlog={createBlog} />
        </Togglable>
    )

    const listBlogs = () => (
        <div>
            {user.realname} logged in {logoutForm()}
            <br />
            {blogs.map((blog) => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    addLike={addLike}
                    user={user}
                    deleteBlog={deleteBlog}
                />
            ))}
            <br />
            {createBlogForm()}
        </div>
    )

    return (
        <div>
            <h1>blogs</h1>

            <Notification message={notification} />
            <ErrorMessage message={errorMessage} />

            {user === null ? loginForm() : listBlogs()}
        </div>
    )
}

export default App
