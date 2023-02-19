import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../misc/queries'
import BookList from './BookList'

const Recommendations = ({ favoriteGenre }) => {
    let books = []
    const result = useQuery(ALL_BOOKS)

    if (result.loading) {
        return <div>Loading...</div>
    } else {
        books = result.data.allBooks.filter((b) =>
            b.genres
                .map((g) => g.toLowerCase())
                .includes(favoriteGenre.toLowerCase())
        )
    }

    return (
        <div>
            <h2>Recommendations</h2>
            <p>
                Based on your favorite genre{' '}
                <b className="capFirst">
                    <i>{favoriteGenre}</i>
                </b>
                :
            </p>
            <div>{books.length > 0 ? <BookList books={books} /> : '-'}</div>
        </div>
    )
}

export default Recommendations
