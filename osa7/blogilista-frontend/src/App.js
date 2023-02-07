import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Reducers:
import { initializeBlogs } from './reducers/blogsReducer'
import { setUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

// Components:
import BlogInfo from './components/BlogInfo'
import ListBlogs from './components/ListBlogs'
import ListUsers from './components/ListUsers'
import Menu from './components/Menu'
import Notification from './components/Notification'
import UserInfo from './components/UserInfo'

// Services:
import blogService from './services/blogs'

import './index.css'

const App = () => {
    useEffect(() => {
        document.title = 'Blog App'
    }, [])

    const dispatch = useDispatch()
    const users = useSelector((state) => state.users)

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

    return (
        <div>
            <Notification />
            <Menu />
            <Routes>
                <Route path="/" element={<ListBlogs />} />
                <Route path="/blogs/:id" element={<BlogInfo />} />
                <Route path="/users" element={<ListUsers />} />
                <Route path="/users/:id" element={<UserInfo users={users} />} />
            </Routes>
        </div>
    )
}

export default App
