import { useState } from 'react'

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456' },
    	{ name: 'Ada Lovelace', number: '39-44-5323523' },
    	{ name: 'Dan Abramov', number: '12-43-234345' },
    	{ name: 'Mary Poppendieck', number: '39-23-6423122' }
	]) 
	const [filter, setFilter] = useState('')
	const [newName, setNewName] = useState('')
	const [newNum, setNewNum] = useState('')

	const addPerson = (event) => {
		event.preventDefault()
		if (newName.trim().length > 0 && newNum.trim().length > 0) {
			if (persons.find(p => p.name === newName) == undefined) {
				const nameObj = { name: newName, number: newNum }
				setPersons(persons.concat(nameObj))
				setNewName('')
				setNewNum('')
			}
			else {
				alert(`${newName} is already added to the phonebook.`)
			}
		}
	}

	const handleFilterChange = (event) => {
		setFilter(event.target.value)
	}

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}
	
	const handleNumChange = (event) => {
		setNewNum(event.target.value)
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter filter={filter} handleFilterChange={handleFilterChange} />
			<h2>Add new</h2>
			<PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
				newNum={newNum} handleNumChange={handleNumChange} />
			<h2>Numbers</h2>
			<Persons persons={persons} filter={filter}/>
		</div>
	)
}

const Filter = ({ filter, handleFilterChange }) => (
	<div>filter names: <input value={filter} onChange={handleFilterChange} /></div>
)

const PersonForm = ({ addPerson, newName, handleNameChange, newNum, handleNumChange }) => (
	<form onSubmit={addPerson}>
		<div>
			name: <input value={newName} onChange={handleNameChange} />
		</div>
		<div>
			number: <input value={newNum} onChange={handleNumChange} />
		</div>
		<div>
			<button type="submit">add</button>
		</div>
	</form>
)

const Person = ({ person }) => (
	<li>{person.name} {person.number}</li>
)

const Persons = ({ persons, filter }) => (
	<ul>{persons.filter(x => x.name.toLowerCase().includes(filter.toLowerCase())).map(p => <Person key={p.name} person={p} />)}</ul>
)

export default App