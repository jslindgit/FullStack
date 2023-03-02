import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients';

import { Patient, NonSensitivePatient, NewPatient } from '../types';

const patients: Patient[] = patientData;

const addPatient = (patient: NewPatient): Patient => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
	const id: string = uuid();
	const newPatient = {	
		id: id,
		...patient
	};
	patients.push(newPatient);
	return newPatient;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation
	}));
};

const getPatientById = (id: string): Patient | null => {
	const matches = patients.filter(p => p.id === id);
	return matches.length > 0 ? matches[0] : null;
};

const getPatients = (): Patient[] => {
	return patients;
};

export default {
	addPatient,
	getNonSensitivePatients,
	getPatientById,
	getPatients,		
};