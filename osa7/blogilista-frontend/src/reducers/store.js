import { configureStore } from '@reduxjs/toolkit'
import blogsReducer from './blogsReducer'
import notificationReducer from './notificationReducer'
import userReducer from './userReducer'
import usersReducer from './usersReducer'

const store = configureStore({
    reducer: {
        blogs: blogsReducer,
        notification: notificationReducer,
        user: userReducer,
        users: usersReducer,
    },
})

export default store
