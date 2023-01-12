import { useDispatch, useSelector } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"
import { setMessage } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
	return (
		<>
			<div>
				{anecdote.content}
			</div>
			<div>
				has&nbsp;{anecdote.votes} votes&nbsp;
				<button onClick={handleClick}>vote</button>
				<br /><br />
			</div>
		</>
	)
}

const AnecdoteList = () => {
	const dispatch = useDispatch()
	const anecdotes = useSelector(state => state.anecdotes)
	
	const vote = (anecdote) => {
		dispatch(addVote(anecdote.id))		
		dispatch(setMessage('You voted \'' + anecdote.content + '\''))
	}

	return (
		<>
			{anecdotes.slice().sort((a, b) => (b.votes - a.votes)).map(anecdote =>
				<Anecdote
					key={anecdote.id}
					anecdote={anecdote}
					handleClick={() => vote(anecdote)}
				/>
			)}
		</>
	)
}

export default AnecdoteList