import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

let timeoutID = 0

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setMessage(state, action) {
            return action.payload
        },
        clearMessage(state, action) {
            return ''
        },
    },
})

export const { setMessage, clearMessage } = notificationSlice.actions

export const setNotification = (message, displayTimeSeconds) => {
    return async (dispatch) => {
        dispatch(setMessage(message))
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
