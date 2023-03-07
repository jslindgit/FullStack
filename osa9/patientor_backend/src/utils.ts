import { Diagnosis, dischargeDate, Gender, HealthCheckRating, NewEntry, NewPatient, sickLeaveDates } from "./types";

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
	return Object.values(Gender).map(v => v.toString()).includes(param);
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
	return Object.values(HealthCheckRating).map(v => Number(v)).includes(param);
};

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String;
};

const isNumber = (text: unknown): text is number => {
	return typeof text === 'number' || text instanceof Number;
};

const parseDate = (date: unknown): string => {
	if (!date || !isString(date) || !isDate(date)) {
		throw new Error('Incorrect or missing date: ' + date);
	}
	return date;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
	if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
		// we will just trust the data to be in correct form
		return [] as Array<Diagnosis['code']>;
	}
  
	return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseDischarge = (object: unknown): dischargeDate => {
	if (!object || typeof object !== 'object' || !('date' in object) || !('criteria' in object)) {
		throw new Error('Incorrect or missing data for dischargeDate: ' + object);
	}

	const discharge: dischargeDate = {
		date: parseDate(object.date),
		criteria: parseString(object.criteria, 'criteria')
	};
	return discharge;
};

const parseSickLeave = (object: unknown): sickLeaveDates => {
	if (!object || typeof object !== 'object' || !('startDate' in object) || !('endDate' in object)) {
		throw new Error('Incorrect or missing data for sickLeaveDates: ' + object);
	}

	const sickLeave: sickLeaveDates = {
		startDate: parseDate(object.startDate),
		endDate: parseDate(object.endDate)
	};
	return sickLeave;
};

const parseGender = (gender: unknown): Gender => {
	if (!gender || !isString(gender) || !isGender(gender)) {
		throw new Error('Incorrect or missing gender: ' + gender);
	}
	return gender;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
	if (!rating || !isNumber(rating) || !isHealthCheckRating(rating)) {
		throw new Error('Incorrect or missing healthCheckRating: ' + rating);
	}
	return rating;
};

const parseString = (value: unknown, fieldName: string): string => {
	if (!value || !isString(value)) {
		throw new Error(`Incorrect or missing value for '${fieldName}' (should be string)`);
	}
	return value;
};

const toNewPatient = (object: unknown): NewPatient => {
	if (!object || typeof object !== 'object') {
		throw new Error('Incorrect or missing data');
	}

	if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
		const newPatient: NewPatient = {
			name: parseString(object.name, 'name'),
			dateOfBirth: parseDate(object.dateOfBirth),
			ssn: parseString(object.ssn, 'ssn'),
			gender: parseGender(object.gender),
			occupation: parseString(object.occupation, 'occupation'),
			entries: []
		};

		return newPatient;
	}

	throw new Error('Incorrect data: some fields are missing');
};

export const toNewEntry = (object: unknown): NewEntry => {
	if (!object || typeof object !== 'object') {
		throw new Error('Incorrect or missing data for Entry');
	}

	if ('type' in object && 'description' in object && 'date' in object && 'specialist' in object && 'diagnosisCodes' in object) {
		const baseData = {
			'description': parseString(object.description, 'description'),
			'date': parseDate(object.date),
			'specialist': parseString(object.specialist, 'specialist'),
			'diagnosisCodes': parseDiagnosisCodes(object)
		};

		switch (parseString(object.type, 'type')) {
		case 'HealthCheck':
			if ('healthCheckRating' in object) {
				const newEntry: NewEntry = { ...baseData, type: 'HealthCheck', healthCheckRating: parseHealthCheckRating(object.healthCheckRating) };
				return newEntry;
			}
			break;
		case "OccupationalHealthcare":
			if ('employerName' in object) {				
				let newEntry: NewEntry = { ...baseData, type: 'OccupationalHealthcare', employerName: parseString(object.employerName, 'employerName') };
				if ('sickLeave' in object) {
					newEntry = { ...newEntry, sickLeave: parseSickLeave(object.sickLeave) };
				}				
				return newEntry;
			}
			break;
		case "Hospital":
			if ('discharge' in object) {
				const newEntry: NewEntry = { ...baseData, type: 'Hospital', discharge: parseDischarge(object.discharge) };				
				return newEntry;
			}
			break;
		default:
			throw new Error('Missing parameter \'type\'');
		}
	}

	throw new Error('Incorrect data for NewEntry!');
};

export default toNewPatient;