import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const anecdoteSlice = createSlice({
	name: 'anecdotes',
	initialState,
	reducers: {		
		addVote(state, action) {
			const anecdoteToChange = state.find(a => a.id === action.payload)
			anecdoteToChange.votes++
		},
		appendAnecdote(state, action) {
			state.push(action.payload)
		},
		newAnecdote(state, action) {
			state.push(action.payload)
		},
		setAnecdotes(state, action) {
			return action.payload
		}
	}
})

export const { addVote, appendAnecdote, newAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer