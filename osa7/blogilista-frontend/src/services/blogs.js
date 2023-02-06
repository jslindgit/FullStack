import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = async (newToken) => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    request.then((response) => response.data.sort((a, b) => b.likes - a.likes))
    return request.then((response) => response.data)
}

const create = async (newBlog) => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
}

const addComment = async (id, comment) => {
    const response = await axios.post(baseUrl + '/' + id + '/comments', {
        comment: comment,
    })
    return response.data
}

const addLike = async (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    const response = await axios.put(
        baseUrl + '/' + updatedBlog.id,
        updatedBlog
    )
    return { ...response.data, user: updatedBlog.user }
}

const deleteBlog = async (blog) => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.delete(baseUrl + '/' + blog.id, config)
    return response.data
}

export default { getAll, create, addComment, addLike, setToken, deleteBlog }
