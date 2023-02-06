import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogsReducer'
import blogService from '../services/blogs'

const CreateBlogForm = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const dispatch = useDispatch()

    const createBlog = async () => {
        const addedBlog = await blogService.create({ title, author, url })
        dispatch(addBlog(addedBlog))
    }

    const submitBlog = (event) => {
        event.preventDefault()
        createBlog()

        dispatch(setNotification('You added a new blog: ' + title, 5))

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h2>Create new</h2>
            <form onSubmit={submitBlog}>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td>Title: &nbsp;</td>
                                <td>
                                    <input
                                        type="text"
                                        value={title}
                                        name="Title"
                                        onChange={({ target }) =>
                                            setTitle(target.value)
                                        }
                                        id="input-title"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Author: &nbsp;</td>
                                <td>
                                    <input
                                        type="text"
                                        value={author}
                                        name="Author"
                                        onChange={({ target }) =>
                                            setAuthor(target.value)
                                        }
                                        id="input-author"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>URL: &nbsp;</td>
                                <td>
                                    <input
                                        type="text"
                                        value={url}
                                        name="URL"
                                        onChange={({ target }) =>
                                            setUrl(target.value)
                                        }
                                        id="input-url"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button id="button-create" type="submit">
                    Create
                </button>
            </form>
        </div>
    )
}

export default CreateBlogForm
