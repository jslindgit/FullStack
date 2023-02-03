import { createSlice } from '@reduxjs/toolkit'

const initialState = null

let timeoutID = 0

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setMessage(state, action) {
            return action.payload
        },
        clearMessage(state, action) {
            return null
        },
    },
})

export const { setMessage, clearMessage } = notificationSlice.actions

export const setNotification = (message, displayTimeSeconds, className) => {
    return async (dispatch) => {
        dispatch(setMessage({ message, className }))
        timeoutID = setTimeout(
            () => dispatch(clearMessage()),
            displayTimeSeconds * 1000
        )
        while (timeoutID--) {
            clearTimeout(timeoutID)
        }
    }
}

export default notificationSlice.reducer
