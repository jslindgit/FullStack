import { configureStore } from '@reduxjs/toolkit'
import blogsReducer from './blogsReducer'
import notificationReducer from './notificationReducer'

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blogs: blogsReducer,
    },
})

export default store
