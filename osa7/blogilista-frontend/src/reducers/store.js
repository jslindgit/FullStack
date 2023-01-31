import { configureStore } from '@reduxjs/toolkit'
import blogsReducer from './blogsReducer'
import notificationReducer from './notificationReducer'
import userReducer from './userReducer'

const store = configureStore({
    reducer: {
        user: userReducer,
        notification: notificationReducer,
        blogs: blogsReducer,
    },
})

export default store
