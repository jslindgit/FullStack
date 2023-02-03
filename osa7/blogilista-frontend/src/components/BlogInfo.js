import { BrowserRouter as Router, Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

const BlogInfo = ({ blogs, addLike }) => {
    const { comment, setComment } = useState('')

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
    }

    return (
        <div>
            <h2>{blog.title}</h2>
            <p>
                <Link to={{ pathname: blog.url }} target="_blank">
                    {blog.url}
                </Link>
            </p>
            <p>Author: {blog.author}</p>
            <p>
                Likes: {blog.likes}&nbsp;
                <button onClick={async () => await addLike(blog)}>Like</button>
            </p>
            <p>Added by {blog.user.realname}</p>
            <h3>Comments</h3>
            <form onSubmit={addComment}>
                <input
                    type="text"
                    value={comment}
                    name="comment"
                    onChange={({target}) => setComment(target.value)}
                    id="input-comment"
                    style={{ width: "300px" }}
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
