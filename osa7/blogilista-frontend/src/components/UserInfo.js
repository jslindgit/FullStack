import { useParams } from 'react-router-dom'

const UserInfo = (users) => {
    const id = useParams().id
    const user = users.users.find((u) => u.id === id)

    if (!user) {
        return null
    }

    return (
        <div>
            <h1>{user.realname}</h1>
        </div>
    )
}

export default UserInfo
