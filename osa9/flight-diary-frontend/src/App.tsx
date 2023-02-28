import { useState, useEffect } from "react";
import axios from 'axios';
import { DiaryEntry } from "./types";
import { getAllEntries, createEntry } from "./services/entryService";

import ViewEntry from "./components/ViewEntry";

const App = () => {
	const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
	const [error, setError] = useState('');
	const [date, setDate] = useState('');
	const [weather, setWeather] = useState('');
	const [visibility, setVisibility] = useState('');
	const [comment, setComment] = useState('');
	
	useEffect(() => {
		getAllEntries().then(data => {
			setDiaryEntries(data);
		})
	}, []);

	const entryCreation = async (event: React.SyntheticEvent) => {
		event.preventDefault();
		try {
			const newEntry = await createEntry({ date, weather, visibility, comment });
			setDiaryEntries(diaryEntries.concat(newEntry));
			
			setDate('');
			setWeather('');
			setVisibility('');
			setComment('');
			setError('');
		} catch (error: unknown) {
			if (axios.isAxiosError(error) && error.response) {
				setError(error.response.data);
			}
			else {
				setError('unknown error: ' + error);
			}
		}
	}

	return (
		<div>
			<h1>Add new entry</h1>
			{error.length > 0 ? (<span style={{color: "red"}}>{error}<br /><br /></span>) : ''}
			<form onSubmit={entryCreation}>
				Date:{' '}<input value={date} onChange={(event) => setDate(event.target.value)} />
				<br />
				Weather:{' '}<input value={weather} onChange={(event) => setWeather(event.target.value)} />
				<br />
				Visibility:{' '}<input value={visibility} onChange={(event) => setVisibility(event.target.value)} />
				<br />
				Comment:{' '}<input value={comment} onChange={(event) => setComment(event.target.value)} />
				<br />
				<button type='submit'>Add</button>
			</form>

			<h1>Diary entries</h1>			
			{diaryEntries.map(e => (
				<ViewEntry key={e.id} entry={e} />
			))}
		</div>
	);
  };
  
  export default App;
