import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, ALL_BOOKS } from '../misc/queries'

const NewBook = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [published, setPublished] = useState('')
    const [genre, setGenre] = useState('')
    const [genres, setGenres] = useState([])

    const [newBook] = useMutation(ADD_BOOK, {
        refetchQueries: [{ query: ALL_BOOKS }],
    })

    const submit = async (event) => {
        event.preventDefault()

        newBook({
            variables: { title, published: Number(published), author, genres },
        }).catch((error) => {
            console.log('newBook error:', error.graphQLErrors[0].message)
        })

        setTitle('')
        setPublished('')
        setAuthor('')
        setGenres([])
    }

    const addGenre = () => {
        if (genre !== 'All Genres') {
            setGenres(genres.concat(genre))
            setGenre('')
        }
    }

    return (
        <div>
            <h2>Add book</h2>
            <form onSubmit={submit}>
                <div>
                    Title:&nbsp;&nbsp;&nbsp;&nbsp;&ensp;
                    <input
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    Author:&nbsp;&nbsp;&nbsp;&ensp;
                    <input
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    Published:&ensp;
                    <input
                        type="number"
                        value={published}
                        onChange={({ target }) => setPublished(target.value)}
                        style={{ width: '80px' }}
                    />
                </div>
                <div>
                    <input
                        value={genre}
                        onChange={({ target }) => setGenre(target.value)}
                    />
                    <button onClick={addGenre} type="button">
                        add genre
                    </button>
                </div>
                <div>genres: {genres.join(' ')}</div>
                <p>
                    <button type="submit">create book</button>
                </p>
            </form>
        </div>
    )
}

export default NewBook
