import { useState } from "react";
import patientService from '../services/patients';
import { Entry, Patient } from "../types";

interface Props {
	patient: Patient
}

const AddEntry = ({ patient }: Props) => {
	const [description, setDescription] = useState('');
	const [date, setDate] = useState('');
	const [specialist, setSpecialist] = useState('');
	const [rating, setRating] = useState('');
	const [codes, setCodes] = useState('');

	const submit = async (event: React.SyntheticEvent) => {
		event.preventDefault();

		const diagnosisCodes: string[] = codes.trim().length > 0 ? codes.trim().split(',').map(c => c.trim()) : [];

		const data = {
			type: 'HealthCheck',
			description: description,
			date: date,
			specialist: specialist,
			diagnosisCodes: diagnosisCodes,
			healthCheckRating: Number(rating)
		};

		const returnedEntry = await patientService.addEntry(patient.id, data);
		patient.entries = [returnedEntry as Entry].concat(patient.entries)
	}

	const clearForm = () => {
		setDescription('');
		setDate('');
		setSpecialist('');
		setRating('');
		setCodes('');
	}

	const styleLabel = { fontSize: '16px', color: 'gray' };
	const styleInput = { fontSize: '20px', border: '0px', borderBottom: '1px solid gray', width: '100%' };
	const styleButton = { fontSize: '18px', padding: '10px' };

	const input = (type: string, label: string, value: string, setter: Function): JSX.Element => {
		return (
			<div>
				<span style={styleLabel}>{label}</span>
				<br />
				<input style={styleInput} type={type} value={value} onChange={(event) => setter(event.target.value)} />
				<br />
				<br />
			</div>
		);
	}

	return (
		<div>
			<form onSubmit={submit} style={{ border: '2px dotted black', padding: '10px' }}>
				<h3>New HealthCheck entry</h3>
				{input('text', 'Description', description, setDescription)}
				{input('date', 'Date', date, setDate)}
				{input('text', 'Specialist', specialist, setSpecialist)}
				{input('text', 'Healthcheck rating', rating, setRating)}
				{input('text', 'Diagnosis codes', codes, setCodes)}
				<button style={styleButton} onClick={clearForm}>Cancel</button>
				&emsp;
				<button type='submit' style={styleButton}>ADD</button>
			</form>
		</div>
	)
}

export default AddEntry;