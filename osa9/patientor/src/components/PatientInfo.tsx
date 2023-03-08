import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import patients from "../services/patients";
import { Diagnosis, Patient, Entry } from "../types";
import { Male, Female } from '@mui/icons-material';
import EntryInfo from "./EntryInfo";
import AddEntry from "./AddEntry";

interface Props {
	diagnoses: Diagnosis[];
}

const PatientInfo = ({ diagnoses }: Props): JSX.Element => {
	const [patient, setPatient] = useState<Patient>();
	const [entries, setEntries] = useState<Array<Entry>>([]);

	const id: string = useParams().id as string;

	useEffect(() => {
		const patientPromise: Promise<Patient> = patients.getById(id);
		patientPromise.then((pat: Patient) => {
			setPatient(pat);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (patient) {
			setEntries(patient.entries);
		}
	}, [patient]);

	const drawGender = (gender: string) => {
		if (gender.toLowerCase() === 'male') {
			return <Male />;
		}
		else if (gender.toLocaleLowerCase() === 'female') {
			return <Female />;
		}
		else {
			return '(Gender: Other)';
		}
	}

	if (patient) {
		return (
			<div>
				<h1>{patient.name}{' '}{drawGender(patient.gender)}</h1>
				<b>SSN:</b> {patient.ssn}
				<br />
				<b>Occupation:</b> {patient.occupation}
				<br />
				<br />
				<AddEntry patient={patient} entries={entries} setEntries={setEntries} />
				<h2>Entries:</h2>
				{entries.map((entry: Entry) => (
					<EntryInfo key={entry.id} entry={entry} diagnoses={diagnoses} />
				))}
			</div>
		);
	}
	else {
		return <div>loading...</div>
	}
}

export default PatientInfo;