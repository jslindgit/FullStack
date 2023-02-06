import { useSelector } from 'react-redux'

import Blog from './Blog'
import CreateBlogForm from './CreateBlogForm'
import Togglable from './Togglable'

const ListBlogs = () => {
    const blogs = useSelector((state) => state.blogs)

    const createBlogForm = () => (
        <Togglable buttonLabel="Create new blog">
            <CreateBlogForm />
        </Togglable>
    )

    return (
        <div>
            <h1>Blogs</h1>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
            <br />
            {createBlogForm()}
        </div>
    )
}

export default ListBlogs
