import { DiaryEntry } from "../types";

interface EntryProps {
	entry: DiaryEntry;
}

const ViewEntry = (props: EntryProps) => {
	return (
		<div>
			<h3>{props.entry.date}</h3>
			<span>Weather: {props.entry.weather}</span>
			<br />
			<span>Visibility: {props.entry.visibility}</span>
			<br />
			<span>Comment: {props.entry.comment}</span>
		</div>
	);
};

export default ViewEntry;