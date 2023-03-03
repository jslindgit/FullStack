export enum Gender {
	Male = 'male',
	Female = 'female',
	Other = 'other'
}

export enum HealthCheckRating {
	"Healthy" = 0,
	"LowRisk" = 1,
	"HighRisk" = 2,
	"CriticalRisk" = 3
}

export interface Diagnose {
	code: string;
	name: string;
	latin?: string;
}

interface BaseEntry {
	id: string;
	description: string;
	date: string;
	specialist: string;
	diagnosisCodes?: Array<Diagnose['code']>;
}

interface HealthCheckEntry extends BaseEntry {
	type: "HealthCheck",
	healthCheckRating: HealthCheckRating
}

export interface sickLeaveDates {
	startDate: string,
	endDate: string
}

interface OccupationalHealthcareEntry extends BaseEntry {
	type: "OccupationalHealthcare",
	employerName: string,
	sickLeave?: sickLeaveDates
}

export interface dischargeDate {
	date: string,
	criteria: string
}

interface HospitalEntry extends BaseEntry {
	type: "Hospital",
	discharge: dischargeDate
}

export interface Patient {
	id: string;
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: Gender;
	occupation: string;
	entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatient = Omit<Patient, 'id'>;
export type Entry =
	| HospitalEntry
	| OccupationalHealthcareEntry
	| HealthCheckEntry;