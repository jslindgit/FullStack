const anecdotesAtStart = [
	'If it hurts, do it more often',
	'Adding manpower to a late software project makes it later!',
	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
	'Premature optimization is the root of all evil.',
	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
	return {
		content: anecdote,
		id: getId(),
		votes: 0
	}
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'ADDVOTE':
			const id = action.data.id
			const anecdoteToChange = state.find(a => a.id === id)
			const changedAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 }
			return state.map(a => a.id !== id ? a : changedAnecdote).sort((a, b) => (b.votes - a.votes))
		case 'NEWANECDOTE':
			return [...state, action.data]
		default:
			return state
	}
}

export const addVote = (id) => {
	return {
		type: 'ADDVOTE',
		data: { id }
	}
}

export const newAnecdote = (content) => {
	return {
		type: 'NEWANECDOTE',
		data: asObject(content)
	}
}

export default reducer