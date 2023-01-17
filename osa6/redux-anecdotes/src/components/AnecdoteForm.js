import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const addAnecdote = async (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''
		const returnedAnecdote = await anecdoteService.createNew(content)
		dispatch(newAnecdote(returnedAnecdote))
		dispatch(setMessage('You added a new anecdote: \'' + content + '\''))
	}

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={addAnecdote}>
				<input name="anecdote"/>&nbsp;
				<button type="submit">create</button>
			</form>
		</div>		
	)
}

export default AnecdoteForm