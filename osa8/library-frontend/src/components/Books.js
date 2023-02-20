import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES } from '../misc/queries'
import BookList from './BookList'

const Books = () => {
    const [genreFilter, setGenreFilter] = useState('All Genres')

    const allGenresResponse = useQuery(ALL_GENRES)
    const { data, loading, refetch } = useQuery(ALL_BOOKS, {
        variables: { genre: genreFilter !== 'All Genres' ? genreFilter : '' },
    })

    useEffect(() => {
        refetch()
    }, [genreFilter])

    let books = []
    let genres = ['All Genres']

    if (allGenresResponse.loading) {
        return <div>Loading...</div>
    } else {
        genres = genres.concat(allGenresResponse.data.allGenres)
    }

    if (loading || !data) {
        return <div>Loading...</div>
    } else {
        books = data.allBooks
    }

    const setGenre = async (event) => {
        event.preventDefault()
        setGenreFilter(event.target.value)
    }

    return (
        <div>
            <h2>Books</h2>
            <b>In genre:</b>{' '}
            <select
                name="genreSelect"
                onChange={setGenre}
                className="capFirst"
                value={genreFilter}
            >
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
