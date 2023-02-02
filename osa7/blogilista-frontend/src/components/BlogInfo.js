import { BrowserRouter as Router, Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const BlogInfo = ({ blogs, addLike }) => {
    const id = useParams().id
    const blog = blogs.find((b) => b.id === id)

    if (!blog) {
        return null
    }

    return (
        <div>
            <h2>{blog.title}</h2>
            <Link to={{ pathname: blog.url }} target="_blank">
                {blog.url}
            </Link>
            <br />
            <br />
            Likes: {blog.likes}&nbsp;
            <button onClick={async () => await addLike(blog)}>Like</button>
            <br />
            <br />
            Added by {blog.user.realname}
            <br />
            <br />
            <Link to="/">Back</Link>
        </div>
    )
}

export default BlogInfo
