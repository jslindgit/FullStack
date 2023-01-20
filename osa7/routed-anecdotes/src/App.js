import { useState } from 'react'
import { 
	BrowserRouter as Router,
	Routes, Route, Link,
	useParams, useNavigate
} from 'react-router-dom'
import { useField } from './hooks'

const Menu = ({ anecdotes, addNew, setNotification }) => {
	const padding = {
		paddingRight: 5
	}
	return (
		<Router>
			<div>			
				<Link style={padding} to="/">anecdotes</Link>|&nbsp; 
				<Link style={padding} to="/create">create new</Link>|&nbsp; 
				<Link style={padding} to="/about">about</Link>
			</div>	

			<Routes>
				<Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
				<Route path="/create" element={<CreateNew addNew={addNew} setNotification={setNotification} />} />
				<Route path="/about" element={<About />} />
				<Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes} />} />
			</Routes>
		</Router>
	)
}

const Anecdote = ({ anecdotes }) => {
	const id = useParams().id
	const anecdote = anecdotes.find(a => a.id === Number(id))
	return (
		<div>
			<h3>{anecdote.content} by {anecdote.author}</h3>
			<p>Has {anecdote.votes} votes</p>
			<p>For more info see {anecdote.info}</p>
		</div>
	)
}

const AnecdoteList = ({ anecdotes }) => (
	<div>
		<h2>Anecdotes</h2>
		<ul>
			{anecdotes.map(anecdote => 
				<li key={anecdote.id}>
					<Link to={'/anecdotes/' + anecdote.id}>{anecdote.content}</Link>					
				</li>
			)}
		</ul>
	</div>
)

const About = () => (
	<div>
		<h2>About anecdote app</h2>
		<p>According to Wikipedia:</p>
		<em>
			An anecdote is a brief, revealing account of an individual person or an incident.
			Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
			such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
			An anecdote is "a story with a point."
		</em>
		<p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
	</div>
)

const Footer = () => (
	<div>
		Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

		See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
	</div>
)

const CreateNew = (props) => {
	const content = useField('text')
	const author = useField('text')
	const info = useField('text')
	const navigate = useNavigate()

	const handleSubmit = (e) => {
		e.preventDefault()
		props.addNew({
			content: content.value,
			author: author.value,
			info: info.value,
			votes: 0
		})
		props.setNotification('A new anecdote \'' + content.value + '\' created!')
		navigate('/')
	}

	const reset = (event) => {
		event.preventDefault()
		content.onReset()
		author.onReset()
		info.onReset()
	}

	return (
		<div>
			<h2>Create a new anecdote</h2>
			<form onSubmit={handleSubmit}>
				<div>
					Content:&nbsp;
					<input {...content} />
				</div>
				<div>
					Author:&nbsp;
					<input {...author} />
				</div>
				<div>
					URL for more info:&nbsp;
					<input {...info} />
				</div>
				<button>Create</button>&nbsp;
				<button onClick={reset}>Reset</button>
				<br /><br />
			</form>
		</div>
	)
}

const ShowNotification = ({ notification, setNotification }) => {
	if (notification.length > 0) {
		setTimeout(() => setNotification(''), 5000)
		return (
			<h1>{notification}</h1>
		)
	}
	else {
		return (
			<></>
		)
	}
}

const App = () => {
	const [anecdotes, setAnecdotes] = useState([
		{
			content: 'If it hurts, do it more often',
			author: 'Jez Humble',
			info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
			votes: 0,
			id: 1
		},
		{
			content: 'Premature optimization is the root of all evil',
			author: 'Donald Knuth',
			info: 'http://wiki.c2.com/?PrematureOptimization',
			votes: 0,
			id: 2
		}
	])

	const [notification, setNotification] = useState('')

	const addNew = (anecdote) => {
		anecdote.id = Math.round(Math.random() * 10000)
		setAnecdotes(anecdotes.concat(anecdote))
	}

	const anecdoteById = (id) =>
		anecdotes.find(a => a.id === id)

	const vote = (id) => {
		const anecdote = anecdoteById(id)

		const voted = {
			...anecdote,
			votes: anecdote.votes + 1
		}

		setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
	}

	return (
		<div>
			<ShowNotification notification={notification} setNotification={setNotification} />
			<h1>Software anecdotes</h1>
			<Menu anecdotes={anecdotes} addNew={addNew} setNotification={setNotification} />
			<Footer />
		</div>
	)
}

export default App
