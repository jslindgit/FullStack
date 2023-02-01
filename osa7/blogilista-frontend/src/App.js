import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Reducers:
import { setNotification } from './reducers/notificationReducer'
import { addBlog, initializeBlogs, setBlogs } from './reducers/blogsReducer'
import { setUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

// Components:
import CreateBlogForm from './components/CreateBlogForm'
import ErrorMessage from './components/ErrorMessage'
import ListBlogs from './components/ListBlogs'
import ListUsers from './components/ListUsers'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UserInfo from './components/UserInfo'

// Services:
import blogService from './services/blogs'
import loginService from './services/login'

import './index.css'

const App = () => {
    const dispatch = useDispatch()
    const blogs = useSelector((state) => state.blogs)
    const user = useSelector((state) => state.user)
    const users = useSelector((state) => state.users)

    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        dispatch(initializeUsers())
    }, [dispatch])

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
        <div>
            {user.realname} logged in
            <form onSubmit={handleLogout}>
                <button type="submit">logout</button>
            </form>
        </div>
    )

    return (
        <div>
            <Notification />
            <ErrorMessage message={errorMessage} />
            {user === null ? loginForm() : logoutForm()}
            <br />
            <Router>
                <div>
                    <Link to="/">Blogs</Link>
                    &nbsp;|&nbsp;
                    <Link to="/users">Users</Link>
                </div>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ListBlogs
                                addLike={addLike}
                                createBlog={createBlog}
                                deleteBlog={deleteBlog}
                            />
                        }
                    />
                    <Route
                        path="/users"
                        element={<ListUsers users={users} />}
                    />
                    <Route
                        path="/users/:id"
                        element={<UserInfo users={users} />}
                    />
                </Routes>
            </Router>
        </div>
    )
}

export default App
