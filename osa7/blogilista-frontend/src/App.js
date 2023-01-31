import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Reducers:
import { setNotification } from './reducers/notificationReducer'
import { addBlog, initializeBlogs, setBlogs } from './reducers/blogsReducer'
import { setUser } from './reducers/userReducer'

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
    const dispatch = useDispatch()
    const blogs = useSelector((state) => state.blogs)
    const user = useSelector((state) => state.user)

    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
        if (loggedUserJSON && loggedUserJSON !== '') {
            const loggedUser = JSON.parse(loggedUserJSON)
            dispatch(setUser(loggedUser))
            blogService.setToken(loggedUser.token)
        }
    }, [])

    // Notifications:
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
            dispatch(setUser(returnedUser))
            dispatch(
                setNotification('logged in as ' + returnedUser.username, 5)
            )
            return true
        } catch (exception) {
            addError('wrong credentials')
            return false
        }
    }

    const handleLogout = (event) => {
        event.preventDefault()
        window.localStorage.removeItem('loggedBlogUser')
        dispatch(setUser(null))
        dispatch(setNotification('logged out', 5))
    }

    const createBlog = async ({ title, author, url }) => {
        const addedBlog = await blogService.create({ title, author, url })
        dispatch(addBlog(addedBlog))
    }

    const addLike = async (blog) => {
        const updatedBlog = await blogService.addLike(blog)
        dispatch(
            setBlogs(
                blogs
                    .slice()
                    .map((b) => (b.id !== updatedBlog.id ? b : updatedBlog))
                    .sort((a, b) => b.likes - a.likes)
            )
        )
    }

    const deleteBlog = async (blog) => {
        if (window.confirm('Delete blog ' + blog.title)) {
            await blogService.deleteBlog(blog)
            dispatch(setBlogs(blogs.filter((b) => b.id !== blog.id)))
            dispatch(setNotification(blog.title + ' removed', 5))
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

            <Notification />
            <ErrorMessage message={errorMessage} />

            {user === null ? loginForm() : listBlogs()}
        </div>
    )
}

export default App
