import { BrowserRouter as Router, Link } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import { initializeBlogs, setBlogs } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogInfo = () => {
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const blogs = useSelector((state) => state.blogs)

    const id = useParams().id
    const blog = blogs.find((b) => b.id === id)

    if (!blog) {
        return null
    }

    let comments = <p>{'No comments yet'}</p>
    if (blog.comments && blog.comments.length > 0) {
        comments = (
            <ul>
                {blog.comments.slice().map((c, index) => (
                    <li key={index}>{c}</li>
                ))}
            </ul>
        )
    }

    const addComment = (event) => {
        event.preventDefault()
        if (comment.length > 0) {
            postComment()
        }
    }

    const addLike = async (blog) => {
        const updatedBlog = await blogService.addLike(blog)
        dispatch(
            setBlogs(
                blogs
                    .slice()
                    .map((b) => (b.id !== updatedBlog.id ? b : updatedBlog))
                    .sort((a, b) => b.likes - a.likes)
            )
        )
    }

    const deleteBlog = async () => {
        if (window.confirm('Delete blog ' + blog.title)) {
            await blogService.deleteBlog(blog)
            dispatch(setBlogs(blogs.filter((b) => b.id !== blog.id)))
            dispatch(setNotification(blog.title + ' removed', 5))
            navigate('/')
        }
    }

    const postComment = async () => {
        await blogService.addComment(id, comment)
        setComment('')
        dispatch(setNotification('Comment added!', 5, 'notification'))
        dispatch(initializeBlogs())
    }

    const removeButton = () => {
        if (!user || !blog) {
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
                    Delete blog
                </button>
            )
        } else {
            return null
        }
    }

    return (
        <div>
            <h2>{blog.title}</h2>
            <p>
                <Link to={{ pathname: blog.url }} target="_blank">
                    {blog.url}
                </Link>
            </p>
            <p>
                <b>Author:</b> {blog.author}
            </p>
            <p>
                <b>Likes:</b> {blog.likes}&nbsp;
                <button onClick={async () => await addLike(blog)}>Like</button>
            </p>
            <p>
                <b>Added by:</b> {blog.user.realname}
            </p>
            <p>{removeButton()}</p>
            <h3>Comments</h3>
            <form onSubmit={addComment}>
                <input
                    type="text"
                    value={comment}
                    name="comment"
                    onChange={({ target }) => setComment(target.value)}
                    id="input-comment"
                    style={{ width: '300px' }}
                />
                &nbsp;&nbsp;&nbsp;
                <button id="button-comment" type="submit">
                    Add comment
                </button>
            </form>
            {comments}
            <Link to="/">Back</Link>
        </div>
    )
}

export default BlogInfo
