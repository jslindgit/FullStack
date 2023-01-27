import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []

const blogsSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        appendBlog(state, action) {
            state.push(action.payload)
        },
        setBlogs(state, action) {
            return action.payload
        },
    },
})

export const { appendBlog, setBlogs } = blogsSlice.actions

export const addBlog = (blog) => {
    return async (dispatch) => {
        dispatch(appendBlog(blog))
    }
}

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export default blogsSlice.reducer
