import { Entry, Diagnosis, HealthCheckRating } from "../types";
import { assertNever } from "../utils";

interface Props {
	entry: Entry;
	diagnoses: Diagnosis[];
}

const EntryInfo = ({ entry, diagnoses }: Props) => {
	const diagnosisInfo = (diagnosisCode: string) => {
		const diagnosis = diagnoses.find(d => d.code === diagnosisCode);
		return <li key={diagnosisCode}>{diagnosisCode}{' ('}{diagnosis ? diagnosis.name : 'Unknown diagnosis code'}{')'}</li>
	}

	switch (entry.type) {
		case "HealthCheck":
			return (
				<div className="entry healthCheck">
					<h3>{entry.date}{' - Health check'}</h3>
					<i>{entry.description}</i>
					<ul>
						{entry.diagnosisCodes?.map((code: string) => (
							diagnosisInfo(code)
						))}
					</ul>
					<p><b>Health check rating: {HealthCheckRating[entry.healthCheckRating]}</b></p>
					<p><i>Diagnosed by {entry.specialist}</i></p>
				</div>
			);
		case "OccupationalHealthcare":
			return (
				<div className="entry occupational">
					<h3>{entry.date}{' - Occupational health care'}{' ('}{entry.employerName}{')'}</h3>
					<i>{entry.description}</i>
					<ul>
						{entry.diagnosisCodes?.map((code: string) => (
							diagnosisInfo(code)
						))}
					</ul>
					{entry.sickLeave ? <b>{'Sick leave: ' + entry.sickLeave.startDate + ' - ' + entry.sickLeave.endDate}</b> : ''}
					<p><i>Diagnosed by {entry.specialist}</i></p>
				</div>
			);
		case "Hospital":
			return (
				<div className="entry hospital">
					<h3>{entry.date}{' - Hospital'}</h3>
					<i>{entry.description}</i>
					<ul>
						{entry.diagnosisCodes?.map((code: string) => (
							diagnosisInfo(code)
						))}
					</ul>
					<b>Discharge date: {entry.discharge.date}{' (' + entry.discharge.criteria + ')'}</b>
					<p><i>Diagnosed by {entry.specialist}</i></p>
				</div>
			);
		default:
			return assertNever(entry)
	}
};

export default EntryInfo