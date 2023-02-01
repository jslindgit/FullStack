import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const initialState = []

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setItems(state, action) {
            return action.payload
        },
    },
})

export const { setItems } = usersSlice.actions

export const initializeUsers = () => {
    return async (dispatch) => {
        const users = await usersService.getAll()
        dispatch(setItems(users))
    }
}

export default usersSlice.reducer
