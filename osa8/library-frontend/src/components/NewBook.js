import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, ALL_BOOKS } from '../queries'

const NewBook = (props) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [published, setPublished] = useState('')
    const [genre, setGenre] = useState('')
    const [genres, setGenres] = useState([])

    const [newBook] = useMutation(ADD_BOOK, {
        refetchQueries: [{ query: ALL_BOOKS }],
    })

    if (!props.show) {
        return null
    }

    const submit = async (event) => {
        event.preventDefault()

        newBook({
            variables: { title, author, published: Number(published), genres },
        })

        setTitle('')
        setPublished('')
        setAuthor('')
        setGenres([])
        setGenre('')
    }

    const addGenre = () => {
        setGenres(genres.concat(genre))
        setGenre('')
    }

    return (
        <div>
            <h2>Add book</h2>
            <form onSubmit={submit}>
                <div>
                    title&ensp;
                    <input
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author&ensp;
                    <input
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    published&ensp;
                    <input
                        type="number"
                        value={published}
                        onChange={({ target }) => setPublished(target.value)}
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
