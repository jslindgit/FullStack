import { NewPatient } from "./types";
import { Gender } from "./types";

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
	return Object.values(Gender).map(v => v.toString()).includes(param);
};

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String;
};

const parseDate = (date: unknown): string => {
	if (!date || !isString(date) || !isDate(date)) {
		throw new Error('Incorrect or missing date: ' + date);
	}
	return date;
};

const parseGender = (gender: unknown): Gender => {
	if (!gender || !isString(gender) || !isGender(gender)) {
		throw new Error('Incorrect or missing gender: ' + gender);
	}
	return gender;
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

export default toNewPatient;