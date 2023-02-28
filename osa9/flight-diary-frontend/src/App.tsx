import { useState, useEffect } from "react";

interface DiaryEntry {
	id: number;
	date: string;
	weather: string;
	visibility: string;
}

const App = () => {
	const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
	
	useEffect(() => {
		setDiaryEntries([{ id: 1, date: '2023-02-28', weather: 'wet', visibility: 'poor' }])
	}, []);

	return (
		<div>
			<h1>Diary entries</h1>
			{diaryEntries.map(entry =>
				<h3 key={entry.id}>{entry.date}</h3>
			)}
		</div>
	);
  };
  
  export default App;
