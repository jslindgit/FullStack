import { BrowserRouter as Router, Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const UserInfo = (users) => {
    const id = useParams().id
    const user = users.users.find((u) => u.id === id)

    if (!user) {
        return null
    }

    const blogList = user.blogs
        .slice()
        .map((b) => <li key={b.id}>{b.title}</li>)

    return (
        <div>
            <h1>{user.realname}</h1>
            <h3>
                {user.blogs.length > 0
                    ? 'Added blogs'
                    : "Hasn't added any blogs"}
            </h3>
            <ul>{blogList}</ul>
            <Link to="/users">Back</Link>
        </div>
    )
}

export default UserInfo
