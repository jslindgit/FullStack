import { Entry, Diagnosis } from "../types";
import { assertNever } from "../utils";

interface Props {
	entry: Entry;
	diagnoses: Diagnosis[];
}

const EntryInfo = ({ entry, diagnoses }: Props) => {
	const diagnosisInfo = (diagnosisCode: string) => {
		const diagnosis = diagnoses.find(d => d.code === diagnosisCode);
		return <li key={diagnosisCode}>{diagnosisCode}{' '}{diagnosis ? diagnosis.name : 'Uknown diagnosis code'}</li>
	}

	const style = (bgColor: string) => {
		return { backgroundColor: bgColor, border: "2px solid black", padding: "10px"};
	}

	switch (entry.type) {
		case "HealthCheck":
			return (
				<div style={style("lightgreen")}>
					<h4>{entry.date}{' - Health check'}</h4>
					<i>{entry.description}</i>
					<ul>
						{entry.diagnosisCodes?.map((code: string) => (
							diagnosisInfo(code)
						))}
					</ul>
				</div>
			);
		case "OccupationalHealthcare":
			return (
				<div style={style("lightblue")}>
					<h4>{entry.date}{' - Occupational health care'}</h4>
					<i>{entry.description}</i>
					<ul>
						{entry.diagnosisCodes?.map((code: string) => (
							diagnosisInfo(code)
						))}
					</ul>
				</div>
			);
		case "Hospital":
			return (
				<div style={style("yellow")}>
					<h4>{entry.date}{' - Hospital'}</h4>
					<i>{entry.description}</i>
					<ul>
						{entry.diagnosisCodes?.map((code: string) => (
							diagnosisInfo(code)
						))}
					</ul>
				</div>
			);
		default:
			return assertNever(entry)
	}	
};

export default EntryInfo