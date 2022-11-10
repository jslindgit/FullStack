import { useState, useEffect } from 'react'
import serverProvider from './services/server_provider'

const App = () => {
	const [persons, setPersons] = useState([
		//{ name: 'Arto Hellas', number: '040-123456' },
    	//{ name: 'Ada Lovelace', number: '39-44-5323523' },
    	//{ name: 'Dan Abramov', number: '12-43-234345' },
    	//{ name: 'Mary Poppendieck', number: '39-23-6423122' }
	]) 
	const [filter, setFilter] = useState('')
	const [newName, setNewName] = useState('')
	const [newNum, setNewNum] = useState('')

	useEffect(() => {
		getPersons()
	}, [])

	const addPerson = (event) => {
		event.preventDefault()
		if (newName.trim().length > 0 && newNum.trim().length > 0) {
			const newPerson = { name: newName, number: newNum }
			const existing = persons.find(p => p.name === newPerson.name)
			if (existing === undefined) {				
				serverProvider
					.postNew(newPerson)
						.then(returnedPerson => {
							setPersons(persons.concat(returnedPerson))							
						}
					)
			}
			else {
				updatePerson(existing.id, newPerson)
			}
			setNewName('')
			setNewNum('')
		}
	}

	const delPerson = (person) => {
		if (window.confirm(`Delete ${person.name}?`)) {
			serverProvider.deleteItem(person.id)			
		}
		getPersons()
	}

	const getPersons = () => {
		serverProvider
			.getAll().then(initPersons => setPersons(initPersons))
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

	const updatePerson = (existingId, newPerson) => {
		if (window.confirm(`${newPerson.name} is already added to the phonebook. Replace the old number with a new one?`)) {
			serverProvider.update(existingId, newPerson)			
		}		
		getPersons()
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter filter={filter} handleFilterChange={handleFilterChange} />
			<h2>Add new</h2>
			<PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
				newNum={newNum} handleNumChange={handleNumChange} />
			<h2>Numbers</h2>
			<Persons persons={persons} filter={filter} delPerson={delPerson}/>
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

const Person = ({ person, delPerson }) => (
	<li>{person.name} {person.number} <button onClick={() => delPerson(person)}>del</button></li>
)

const Persons = ({ persons, filter, delPerson }) => (
	<ul>{persons.filter(x => x.name.toLowerCase().includes(filter.toLowerCase())).map(p => <Person key={p.id} person={p} delPerson={delPerson} />)}</ul>
)

export default App