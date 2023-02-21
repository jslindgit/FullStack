import { useQuery, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from '../misc/queries'
import BookList from './BookList'

const Recommendations = ({ favoriteGenre }) => {
    let books = []
    const { data, loading, refetch } = useQuery(ALL_BOOKS, {
        variables: { genre: favoriteGenre },
    })

    useSubscription(BOOK_ADDED, {
        onData: () => {
            refetch()
        },
    })

    if (loading) {
        return <div>Loading...</div>
    } else {
        books = data.allBooks
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
            <div>
                {books.length > 0 ? <BookList books={books} /> : 'No matches'}
            </div>
        </div>
    )
}

export default Recommendations
