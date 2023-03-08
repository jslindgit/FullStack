import { useState } from "react";
import patientService from '../services/patients';
import { Entry, Patient, sickLeaveDates, dischargeDate } from "../types";
import { colorHealthCheck, colorOccupational, colorHospital } from "../constants";

interface Props {
	patient: Patient,
	entries: Entry[],
	setEntries: Function
}

const AddEntry = ({ patient, entries, setEntries }: Props) => {
	const [error, setError] = useState('');
	const [type, setType] = useState('HealthCheck');

	// Form:
	const [description, setDescription] = useState('');
	const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
	const [specialist, setSpecialist] = useState('');
	const [codes, setCodes] = useState('');
	const [rating, setRating] = useState('');
	const [employer, setEmployer] = useState('');
	const [sickLeaveStart, setSickLeaveStart] = useState(new Date().toISOString().slice(0, 10));
	const [sickLeaveEnd, setSickLeaveEnd] = useState(new Date(new Date().getTime() + 86400000).toISOString().slice(0, 10));
	const [dischargeDate, setDischargeDate] = useState(new Date().toISOString().slice(0, 10));
	const [dischargeCriteria, setDischargeCriteria] = useState('');

	const showError = () => {
		return error.length > 0 ? <p style={{ background: '#fdece9', color: '#b40000', fontSize: '24px', padding: '15px' }}><b>{error}</b></p> : <></>
	}

	const submit = async (event: React.SyntheticEvent) => {
		event.preventDefault();

		const diagnosisCodes: string[] = codes.trim().length > 0 ? codes.trim().split(',').map(c => c.trim()) : [];

		let data = {};
		const baseData = {
			type: type,
			description: description,
			date: date,
			specialist: specialist,
			diagnosisCodes: diagnosisCodes
		};

		switch (type) {
			case 'HealthCheck':
				data = { ...baseData, healthCheckRating: Number(rating) };
				break;
			case 'OccupationalHealthcare':
				if (sickLeaveStart && sickLeaveEnd) {
					const sickLeave: sickLeaveDates = { startDate: sickLeaveStart, endDate: sickLeaveEnd };
					data = { ...baseData, employerName: employer, sickLeave: sickLeave };
				} else {
					data = { ...baseData, employerName: employer };
				}
				break;
			case 'Hospital':
				const discharge: dischargeDate = { date: dischargeDate, criteria: dischargeCriteria };
				data = { ...baseData, discharge: discharge };
				break;
			default:
				throw new Error('Unhandled Entry type: ' + type);
		}

		try {
			const returnedEntry = await patientService.addEntry(patient.id, data);
			setEntries([returnedEntry as Entry].concat(entries));
			setError('');
			clearForm();
		} catch (error: unknown) {
			if (error instanceof Error) {
				if ('response' in error && typeof error.response === 'object' && error.response && 'data' in error.response
					&& typeof error.response.data === 'object' && error.response.data && 'Error' in error.response.data && typeof error.response.data.Error === 'string') {
					setError(error.response.data.Error);
				}
			}
		}
	}

	const clearForm = () => {
		setDescription('');
		setDate(new Date().toISOString().slice(0, 10));
		setSpecialist('');
		setCodes('');
		setRating('');
		setEmployer('');
		setSickLeaveStart(new Date().toISOString().slice(0, 10));
		setSickLeaveEnd(new Date(new Date().getTime() + 86400000).toISOString().slice(0, 10));
		setDischargeDate(new Date().toISOString().slice(0, 10));
		setDischargeCriteria('');
	}

	const styleLabel = { fontSize: '16px', color: 'gray' };
	const styleInput = { fontSize: '20px', border: '0px', borderBottom: '2px solid #9c9c9c', width: '98%', padding: '10px' };

	const formColor = () => {
		switch (type) {
			case 'HealthCheck':
				return colorHealthCheck;
			case 'OccupationalHealthcare':
				return colorOccupational;
			case 'Hospital':
				return colorHospital;
			default:
				throw new Error('Unhandled Entry type: ' + type);
		}
	}

	const input = (type: string, label: string, value: string, setter: Function): JSX.Element => {
		return (
			<div key={label}>
				<span style={styleLabel}>{label}</span>
				<br />
				<input style={{ ...styleInput, background: formColor() }} type={type} value={value} onChange={(event) => setter(event.target.value)} />
				<br />
				<br />
			</div>
		);
	}

	const typeSpecificFields = (): JSX.Element[] => {
		switch (type) {
			case 'HealthCheck':
				return ([
					input('number', 'Healthcheck rating', rating, setRating)
				]);
			case 'OccupationalHealthcare':
				return ([
					input('text', 'Employer', employer, setEmployer),
					input('date', 'Sickleave start date', sickLeaveStart, setSickLeaveStart),
					input('date', 'Sickleave end date', sickLeaveEnd, setSickLeaveEnd)
				]);
			case 'Hospital':
				return ([
					input('date', 'Discharge date', dischargeDate, setDischargeDate),
					input('text', 'Discharge criteria', dischargeCriteria, setDischargeCriteria)
				]);
			default:
				throw new Error('Unhandled Entry type: ' + type);
		}
	}

	return (
		<div>
			<button onClick={() => setType('HealthCheck')}>Health Check</button>
			<button onClick={() => setType('OccupationalHealthcare')}>Occupational Healthcare</button>
			<button onClick={() => setType('Hospital')}>Hospital</button>
			<br /><br />
			{showError()}
			<form onSubmit={submit} style={{ border: '2px dotted black', padding: '15px', background: formColor() }}>
				<h3>New {type} entry</h3>
				{input('text', 'Description', description, setDescription)}
				{input('date', 'Date', date, setDate)}
				{input('text', 'Specialist', specialist, setSpecialist)}
				{typeSpecificFields()}
				{input('text', 'Diagnosis codes', codes, setCodes)}
				<button type="reset" className="red" onClick={clearForm}>CANCEL</button>
				<button type='submit' className="green">ADD</button>
			</form>
		</div>
	)
}

export default AddEntry;