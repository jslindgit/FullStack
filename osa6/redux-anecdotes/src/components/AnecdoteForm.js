import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const addAnecdote = (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''
		dispatch(newAnecdote(content))
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