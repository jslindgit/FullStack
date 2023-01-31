import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setItem(state, action) {
            return action.payload
        },
    },
})

export const { setItem } = userSlice.actions

export const setUser = (user) => {
    return async (dispatch) => {
        dispatch(setItem(user))
    }
}

export default userSlice.reducer
