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
export default notificationSlice.reducer