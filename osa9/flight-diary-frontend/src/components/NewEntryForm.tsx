import { useState } from "react";

interface NewEntryFormProps {
	entryCreation: (date: string, weather: string, visibility: string, comment: string) => Promise<boolean>;
}

const NewEntryForm = (props: NewEntryFormProps) => {
	const [date, setDate] = useState('2023-01-01');
	const [weather, setWeather] = useState('');
	const [visibility, setVisibility] = useState('');
	const [comment, setComment] = useState('');

	const onSubmit = async (event: React.SyntheticEvent) => {
		event.preventDefault();

		const r = props.entryCreation(date, weather, visibility, comment);
		r.then(result => {
			if (result) {
				setDate('');
				setComment('');
			}
		})
	}

	const onChangeWeather = (value: string) => {
		if (weather !== value) {
			setWeather(value);
		}
	}

	const onChangeVisibility = (value: string) => {
		if (visibility !== value) {
			setVisibility(value);
		}
	}

	return (
		<form onSubmit={onSubmit}>
			Date:{' '}<input type="date" value={date} min="0001-01-01" max="2999-12-31" onChange={(event) => setDate(event.target.value)} />
			<br />
			Weather:{' '}
			Sunny<input type="radio" name="weather" onChange={() => onChangeWeather('sunny')} />&nbsp;
			Rainy<input type="radio" name="weather" onChange={() => onChangeWeather('rainy')} />&nbsp;
			Cloudy<input type="radio" name="weather" onChange={() => onChangeWeather('cloudy')} />&nbsp;
			Stormy<input type="radio" name="weather" onChange={() => onChangeWeather('stormy')} />&nbsp;
			Windy<input type="radio" name="weather" onChange={() => onChangeWeather('windy')} />
			<br />
			Visibility:{' '}
			Great<input type="radio" name="visibility" onChange={() => onChangeVisibility('great')} />&nbsp;
			Good<input type="radio" name="visibility" onChange={() => onChangeVisibility('good')} />&nbsp;
			Ok<input type="radio" name="visibility" onChange={() => onChangeVisibility('ok')} />&nbsp;
			Poor<input type="radio" name="visibility" onChange={() => onChangeVisibility('poor')} />&nbsp;
			<br />
			Comment:{' '}<input value={comment} onChange={(event) => setComment(event.target.value)} />
			<br />
			<button type='submit'>Add</button>
		</form>
	)
}

export default NewEntryForm