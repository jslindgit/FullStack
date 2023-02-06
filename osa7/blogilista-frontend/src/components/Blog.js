import { BrowserRouter as Router, Link } from 'react-router-dom'

const Blog = ({ blog }) => {
    return (
        <Link to={'/blogs/' + blog.id}>
            <div className="blog">{blog.title}</div>
        </Link>
    )
}

export default Blog
