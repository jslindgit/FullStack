import { useState, useEffect } from "react";
import axios from 'axios';
import { DiaryEntry } from "./types";
import { getAllEntries, createEntry } from "./services/entryService";

import ViewEntry from "./components/ViewEntry";
import NewEntryForm from "./components/NewEntryForm";

const App = () => {
	const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
	const [error, setError] = useState('');
	
	useEffect(() => {
		getAllEntries().then(data => {
			setDiaryEntries(data);
		})
	}, []);

	const entryCreation = async (date: string, weather: string, visibility: string, comment: string): Promise<boolean> => {
		try {
			const newEntry = await createEntry({ date, weather, visibility, comment });
			setDiaryEntries(diaryEntries.concat(newEntry));
			setError('');
			return true;
		} catch (error: unknown) {
			if (axios.isAxiosError(error) && error.response) {
				setError(error.response.data);
			}
			else {
				setError('unknown error: ' + error);
			}
			return false;
		}
	}

	return (
		<div>
			<h1>Add new entry</h1>
			{error.length > 0 ? (<span style={{color: "red"}}>{error}<br /><br /></span>) : ''}
			<NewEntryForm entryCreation={entryCreation} />
			<h1>Diary entries</h1>			
			{diaryEntries.map(e => (
				<ViewEntry key={e.id} entry={e} />
			))}
		</div>
	);
  };
  
  export default App;
