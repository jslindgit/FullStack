import './index.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'

// Components:
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'
import Menu from './components/Menu'
import Recommendations from './components/Recommendations'

// Apollo:
import { useApolloClient } from '@apollo/client'
import { useQuery } from '@apollo/client'
import { ME } from './misc/queries'

const App = () => {
    const [token, setToken] = useState(null)
    const [user, setUser] = useState('')
    const [favoriteGenre, setFavoriteGenre] = useState('')

    useEffect(() => {
        document.title = 'Library'
    }, [])

    useEffect(() => {
        if (!token && localStorage.getItem('library-user-token')) {
            setToken(localStorage.getItem('library-user-token'))
        }
    })

    const client = useApolloClient()

    const logout = () => {
        setToken(null)
        localStorage.clear()
        client.resetStore()
    }

    // User:
    const result = useQuery(ME, {
        skip: !localStorage.getItem('library-user-token'),
    })

    if (result.loading) {
        return <div>Loading...</div>
    } else if (user == '' && result && result.data && result.data.me) {
        setUser(result.data.me.username)
        setFavoriteGenre(result.data.me.favoriteGenre)
    }

    return (
        <div>
            <table align="center">
                <tbody>
                    <tr>
                        <td>
                            <div align="center">
                                <h1>Library App</h1>
                                <Menu
                                    isLoggedIn={token}
                                    logout={logout}
                                    user={user}
                                />
                                <Routes>
                                    <Route path="/" element={<Authors />} />
                                    <Route path="/books" element={<Books />} />
                                    <Route
                                        path="/addbook"
                                        element={<NewBook />}
                                    />
                                    <Route
                                        path="/login"
                                        element={<Login setToken={setToken} />}
                                    />
                                    <Route
                                        path="/recommendations"
                                        element={
                                            <Recommendations
                                                favoriteGenre={favoriteGenre}
                                            />
                                        }
                                    />
                                </Routes>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default App
