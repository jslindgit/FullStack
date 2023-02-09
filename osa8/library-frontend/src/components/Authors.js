import { useMutation, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { ALL_AUTHORS, SET_BIRTHYEAR } from '../queries'

const Authors = (props) => {
    const result = useQuery(ALL_AUTHORS)

    const [setBirthYear] = useMutation(SET_BIRTHYEAR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
    })

    const [selectedAuthor, setSelectedAuthor] = useState('')
    const [born, setBorn] = useState(1900)
    const [initBorn, setInitBorn] = useState(false)

    if (!props.show) {
        return null
    }

    let authors = []
    if (result.loading) {
        return <div>Loading...</div>
    } else {
        authors = result.data.allAuthors
        if (initBorn === false && authors.length > 0) {
            setBorn(authors[0].born)
            setInitBorn(true)
        }
    }

    const submit = async (event) => {
        event.preventDefault()
        setBirthYear({
            variables: { name: selectedAuthor, year: Number(born) },
        })
    }

    const setSelected = (event) => {
        setSelectedAuthor(event.target.value)
        const selected = authors.find((a) => a.name === event.target.value)
        setBorn(selected.born ? selected.born : 1900)
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
            <h2>Set birthyear</h2>
            <form onSubmit={submit}>
                <select
                    name="bornSelect"
                    value={selectedAuthor}
                    onChange={setSelected}
                >
                    {authors.map((a) => (
                        <option key={a.name} value={a.name}>
                            {a.name}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    style={{ width: '80px' }}
                    value={born}
                    onChange={({ target }) => setBorn(target.value)}
                />
                <button type="submit">Set</button>
            </form>
        </div>
    )
}

export default Authors
