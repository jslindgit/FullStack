import { useState } from 'react'

const Button = (props) => (
	<button onClick={props.handleClick}>
		{props.text}
	</button>
)

const Statistics = ({good, neutral, bad, all}) => {
	if (all > 0) {
		return (
			<table><tbody>
				<StatisticsLine text="good" value={good} />
				<StatisticsLine text="neutral" value={neutral} />
				<StatisticsLine text="bad" value={bad} />
				<StatisticsLine text="all" value={all} />
				<StatisticsLine text="average" value={(good + neutral + bad) / 3} />
				<StatisticsLine text="positive" value={(all > 0 ? good / all * 100 : 0) + "%"} />
			</tbody></table>
		)
	}
	else {
		return (<>No feedback given</>)
	}
}

const StatisticsLine = ({text, value}) => {
	return (
		<tr><td>{text}</td><td>{value}</td>			 
		</tr>
	)
}

const App = () => {	
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)
	const [all, setAll] = useState(0)

	const increase = (setter, value) => {
		setter(value + 1)
		setAll(all + 1)
	}
	
	return (
		<div>
			<h1>give feedback</h1>
			<Button text="good" handleClick={() => increase(setGood, good)}/>
			<Button text="neutral" handleClick={() => increase(setNeutral, neutral)}/>
			<Button text="bad" handleClick={() => increase(setBad, bad)}/>	
			<h1>statistics</h1>		
			<Statistics good={good} neutral={neutral} bad={bad} all={all}/>
		</div>		
	)
}

export default App;
