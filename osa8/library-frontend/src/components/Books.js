import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../misc/queries'
import BookList from './BookList'

const Books = () => {
    const [genreFilter, setGenreFilter] = useState('All Genres')
    const [genreSelectInit, setGenreSelectInit] = useState(false)

    const result = useQuery(ALL_BOOKS)

    let books = []
    let genres = ['All Genres']

    if (result.loading) {
        return <div>Loading...</div>
    } else {
        if (!result || !result.data) {
            return null
        }
        books =
            genreFilter === 'All Genres'
                ? result.data.allBooks
                : result.data.allBooks.filter((b) =>
                      b.genres
                          .map((g) => g.toLowerCase())
                          .includes(genreFilter.toLowerCase())
                  )

        result.data.allBooks.forEach((b) => {
            b.genres.forEach((g) => {
                if (!genres.includes(g.toLowerCase())) {
                    genres = genres.concat(g.toLowerCase())
                }
            })
        })
    }

    const setGenre = (event) => {
        event.preventDefault()
        setGenreFilter(event.target.value)
    }

    return (
        <div>
            <h2>Books</h2>
            <b>In genre:</b>{' '}
            <select name="genreSelect" onChange={setGenre} className="capFirst">
                {genres.map((g) => (
                    <option key={g} value={g}>
                        {g}
                    </option>
                ))}
            </select>
            <BookList books={books} />
        </div>
    )
}

export default Books
