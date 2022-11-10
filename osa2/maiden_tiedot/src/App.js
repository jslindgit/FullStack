import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
	const [countries, setCountries] = useState([])
	const [filter, setFilter] = useState('')

	useEffect(() => {
		if (filter.length > 0) {
			axios.get('https://restcountries.com/v3.1/name/' + filter)
			.then(response => {
				setCountries(response.data)
			})
			.catch((exception) => {
				console.log('error: ', exception)
			})
		}
	}, [filter])

	return (
		<div>
			<div>
				Find countries: 
				<input
					value={filter} 
					onChange={(event) => setFilter(event.target.value)} 
				/>
			</div>
			<Countries countries={countries} setFilter={setFilter} />
		</div>
	)
}

const CountryButton = ({ countryName, setFilter }) => (
	<button onClick={() => setFilter(countryName)}>Show</button>
)

const CountryName = ({ country, setFilter }) => (
	<>{country.name.common} <CountryButton countryName={country.name.common} setFilter={setFilter}/><br /></>
)

const CountryFull = ({ country }) => (
	<>
		<h1>{country.name.common}<br /></h1>
		<>Capital: {country.capital[0]}<br /></>
		<>Area: {country.area}</>
		<h3>Languages:</h3>		
		<ul>{Object.entries(country.languages).map(l => <li key={l[0]}>{l[1]}</li>)}</ul>
		<img src={country.flags['png']} height={100} />
	</>
)

const Countries = ({ countries, setFilter }) => {
	if (countries.length > 10) {
		return (<p>Too many matches ({countries.length}), please specify.</p>)
	}
	else if (countries.length > 1) {
		return (<p>{countries.map(c => <CountryName key={c.name.common} country={c} setFilter={setFilter} />)}</p>)
	}
	else if (countries.length == 1) {
		return (<CountryFull country={countries[0]} />)
	}
	else {
		return (<p>No matches.</p>)
	}
}

export default App;
