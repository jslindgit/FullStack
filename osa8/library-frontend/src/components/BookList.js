const BookList = ({ books }) => {
    return (
        <table className="striped">
            <tbody>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Published</th>
                    <th>Genres</th>
                </tr>
                {books.map((b) => (
                    <tr key={b.title}>
                        <td>{b.title}</td>
                        <td>{b.author.name}</td>
                        <td>{b.published}</td>
                        <td className="capFirst">
                            {b.genres ? b.genres.join(', ') : ''}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default BookList
