import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from '../reducers/notificationReducer'

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
	const filter = useSelector(state => state.filter)
	
	const vote = (anecdote) => {
		dispatch(voteAnecdote(anecdote))		
		dispatch(setNotification('You voted \'' + anecdote.content + '\'', 5))
	}

	const filtered = anecdotes.slice().filter(x => x.content.includes(filter)).sort((a, b) => (b.votes - a.votes))

	if (filtered.length > 0) {
		return (
			<>
				{filtered.map(anecdote =>
					<Anecdote
						key={anecdote.id}
						anecdote={anecdote}
						handleClick={() => vote(anecdote)}
					/>
				)}
			</>
		)
	}
	else {
		return (
			<div>No anecdotes matching '{filter}' found</div>
		)
	}
}

export default AnecdoteList