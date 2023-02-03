import { BrowserRouter as Router, Link } from 'react-router-dom'

const Blog = ({ blog, user, deleteBlog }) => {
    const blogInfo = (blog) => {
        return <span>{removeButton(blog, user)}</span>
    }

    const removeButton = (blog, user) => {
        if (!user) {
            return null
        }

        if (
            blog.user &&
            (JSON.stringify(blog.user.username) ===
                JSON.stringify(user.username) ||
                blog.user === user.id)
        ) {
            return (
                <button onClick={async () => await deleteBlog(blog)}>
                    Remove
                </button>
            )
        } else {
            return null
        }
    }

    return (
        <div className="blog">
            <Link to={'/blogs/' + blog.id}>{blog.title}</Link>
            &nbsp;&nbsp;&nbsp;
            {blogInfo(blog)}
        </div>
    )
}

export default Blog
