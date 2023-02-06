import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// Components:
import Togglable from './Togglable'
import LoginForm from './LoginForm'

// Reducers:
import { setNotification } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'

const Menu = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)

    const handleLogout = (event) => {
        event.preventDefault()
        window.localStorage.removeItem('loggedBlogUser')
        dispatch(setUser(null))
        dispatch(setNotification('Logged out', 5))
    }

    const loginForm = () => (
        <Togglable buttonLabel="Login">
            <LoginForm />
        </Togglable>
    )

    const logoutForm = () => (
        <div>
            <form onSubmit={handleLogout}>
                {user.realname} logged in&nbsp;
                <button type="submit">Logout</button>
            </form>
        </div>
    )

    return (
        <div className="menu">
            <Link to="/">Blogs</Link>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <Link to="/users">Users</Link>
            <br />
            <br />
            {user === null ? loginForm() : logoutForm()}
        </div>
    )
}

export default Menu
