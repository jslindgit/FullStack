import { useSelector } from 'react-redux'

import Blog from './Blog'
import CreateBlogForm from './CreateBlogForm'
import Togglable from './Togglable'

const ListBlogs = ({ addLike, createBlog, deleteBlog }) => {
    const blogs = useSelector((state) => state.blogs)
    const user = useSelector((state) => state.user)

    const createBlogForm = () => (
        <Togglable buttonLabel="create new blog">
            <CreateBlogForm createBlog={createBlog} />
        </Togglable>
    )

    return (
        <div>
            <h1>Blogs</h1>
            {blogs.map((blog) => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    addLike={addLike}
                    user={user}
                    deleteBlog={deleteBlog}
                />
            ))}
            <br />
            {createBlogForm()}
        </div>
    )
}

export default ListBlogs
