import { useDispatch } from 'react-redux'
import { useState } from 'react'

// Services:
import blogService from '../services/blogs'
import loginService from '../services/login'

// Reducers:
import { setNotification } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'

const LoginForm = () => {
    const dispatch = useDispatch()

    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const login = async () => {
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
                setNotification(
                    'Logged in as ' + returnedUser.username,
                    5,
                    'notification'
                )
            )
            return true
        } catch (exception) {
            console.log(exception)
            dispatch(setNotification('Wrong credentials', 5, 'error'))
            return false
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const success = await login({ username, password })
        if (success) {
            setUserName('')
        }
        setPassword('')
    }

    return (
        <div>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td>Username:</td>
                            <td>
                                <input
                                    type="text"
                                    value={username}
                                    name="Username"
                                    onChange={({ target }) =>
                                        setUserName(target.value)
                                    }
                                    id="input-username"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Password:</td>
                            <td>
                                <input
                                    type="password"
                                    value={password}
                                    name="Password"
                                    onChange={({ target }) =>
                                        setPassword(target.value)
                                    }
                                    id="input-password"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button id="button-login" type="submit">
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginForm
