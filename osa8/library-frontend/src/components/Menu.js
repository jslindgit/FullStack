import { BrowserRouter as Router, Link } from 'react-router-dom'

const Menu = ({ isLoggedIn, logout, user }) => {
    const loggedIn = () => {
        return (
            <>
                <Link to="/recommendations">Recommendations</Link>
                &emsp;|&emsp;
                <Link to="/addbook">Add Book</Link>
                <span className="smallText">
                    <br />
                    <br />
                    Logged in as{' '}
                    <b>
                        {user} (
                        <Link to="/login" onClick={logout}>
                            Logout
                        </Link>
                        )
                    </b>
                </span>
            </>
        )
    }

    const loggedOut = () => {
        return (
            <>
                <Link to="/login">Login</Link>
            </>
        )
    }

    return (
        <div className="menu">
            &emsp;
            <Link to="/">Authors</Link>
            &emsp;|&emsp;
            <Link to="/books">Books</Link>
            &emsp;|&emsp;
            {isLoggedIn ? loggedIn() : loggedOut()}
            &emsp;
        </div>
    )
}

export default Menu
