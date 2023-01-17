import { createSlice } from "@reduxjs/toolkit";

const initialState = ''

const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		setMessage(state, action) {
			return action.payload
		},
		clearMessage(state, action) {
			return ''
		}
	}
})

export const { setMessage, clearMessage } = notificationSlice.actions

export const setNotification = (message, displayTimeSeconds) => {
	return async dispatch => {
		dispatch(setMessage(message))
		setTimeout(() => dispatch(clearMessage()), displayTimeSeconds * 1000)
	}
}

export default notificationSlice.reducer