import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
	token = `bearer ${newToken}`
}

const getAll = () => {
	const request = axios.get(baseUrl)
	request.then(response => response.data.sort((a, b) => b.likes - a.likes))
	return request.then(response => response.data)
}

const create = async newBlog => {
	const config = {
		headers: { Authorization: token },
	}

	const response = await axios.post(baseUrl, newBlog, config)
	return response.data
}

const addLike = async (blog) => {
	blog.likes = blog.likes + 1
	const response = await axios.put(baseUrl + '/' + blog.id, blog)
	return response.data
}

const deleteBlog = async (blog) => {
	const config = {
		headers: { Authorization: token },
	}

	const response = await axios.delete(baseUrl + '/' + blog.id, config)
	return response.data
}

export default { getAll, create, addLike, setToken, deleteBlog }