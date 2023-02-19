import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../misc/queries.js'

const Login = ({ setToken }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [login, loginResult] = useMutation(LOGIN, {
        onError: (error) => {
            console.log('Login.js error:', error.graphQLErrors[0].message)
        },
    })

    const navigate = useNavigate()

    useEffect(() => {
        if (loginResult.data) {
            const token = loginResult.data.login.value
            setToken(token)
            localStorage.setItem('library-user-token', token)
        }
    }, [loginResult.data])

    useEffect(() => {
        if (localStorage.getItem('library-user-token')) {
            navigate('/')
        }
    }, [localStorage.getItem('library-user-token')])

    const submit = async (event) => {
        event.preventDefault()

        if (username.length > 0 && password.length > 0) {
            await login({
                variables: { username, password },
            })

            setUsername('')
            setPassword('')
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={submit}>
                <table>
                    <tbody>
                        <tr>
                            <td width="10">Username:</td>
                            <td>
                                <input
                                    value={username}
                                    onChange={({ target }) =>
                                        setUsername(target.value)
                                    }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Password:</td>
                            <td>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={({ target }) =>
                                        setPassword(target.value)
                                    }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <button type="submit">Login</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}

export default Login
