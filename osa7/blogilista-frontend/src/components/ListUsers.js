import { BrowserRouter as Router, Link } from 'react-router-dom'

const ListUsers = (users) => {
    const userRows = users.users.map((u) => <BasicInfo user={u} key={u.id} />)

    return (
        <div>
            <h1>Users</h1>
            <table>
                <tbody>
                    <tr style={{ fontWeight: 'bold' }}>
                        <td>Name</td>
                        <td>
                            <b>Blogs created</b>
                        </td>
                    </tr>
                    {userRows}
                </tbody>
            </table>
        </div>
    )
}

const BasicInfo = (user) => {
    return (
        <tr>
            <td>
                <Link to={'/users/' + user.user.id}>{user.user.realname}</Link>
                &nbsp;&nbsp;
            </td>
            <td>{user.user.blogs.length}</td>
        </tr>
    )
}

export default ListUsers
