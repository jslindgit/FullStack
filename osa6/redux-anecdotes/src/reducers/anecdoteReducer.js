import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

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
		setAnecdotes(state, action) {
			return action.payload
		}
	}
})

export const { addVote, appendAnecdote, newAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
	return async dispatch => {
		const anecdotes = await anecdoteService.getAll()
		dispatch(setAnecdotes(anecdotes))
	}
}

export const createAnecdote = content => {
	return async dispatch => {
		const newAnecdote = await anecdoteService.createNew(content)
		dispatch(appendAnecdote(newAnecdote))
	}
}

export const voteAnecdote = (anecdoteObject) => {
	return async dispatch => {
		await anecdoteService.update(anecdoteObject.id, {...anecdoteObject, votes: anecdoteObject.votes + 1 })
		dispatch(addVote(anecdoteObject.id))
	}
}

export default anecdoteSlice.reducer