import { gql, useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'

const Authors = (props) => {
    const result = useQuery(ALL_AUTHORS)

    if (!props.show) {
        return null
    }

    let authors = []

    if (result.loading) {
        return <div>Loading...</div>
    } else {
        authors = result.data.allAuthors
    }

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Born</th>
                        <th>Books</th>
                    </tr>
                    {authors.map((a) => (
                        <tr key={a.name}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Authors
