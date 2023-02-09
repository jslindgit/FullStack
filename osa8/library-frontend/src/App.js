import './index.css'

import { useEffect, useState } from 'react'

// Components:
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
    useEffect(() => {
        document.title = 'Library'
    }, [])

    const [page, setPage] = useState('authors')

    return (
        <div>
            <table align="center">
                <tbody>
                    <tr>
                        <td>
                            <div align="center">
                                <button onClick={() => setPage('authors')}>
                                    authors
                                </button>
                                <button onClick={() => setPage('books')}>
                                    books
                                </button>
                                <button onClick={() => setPage('add book')}>
                                    add book
                                </button>
                            </div>
                            <Authors show={page === 'authors'} />
                            <Books show={page === 'books'} />
                            <NewBook show={page === 'add book'} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default App
