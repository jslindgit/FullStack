import { Entry, Diagnosis } from "../types";

interface Props {
	entry: Entry;
}

const EntryInfo = (props: Props) => {
	const entry = props.entry;

	return (
		<div>
			{entry.date} <i>{entry.description}</i>
			<ul>
				{entry.diagnosisCodes?.map((code: string) => (
					<li key={code}>{code}</li>
				))}
			</ul>
		</div>
	);
};

export default EntryInfo