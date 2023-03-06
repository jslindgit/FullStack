import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';
import { v4 as uuid } from 'uuid';

const router = express.Router();

router.get('/', (_req, res) => {
	res.json(patientService.getNonSensitivePatients());
});

router.get('/:id', (req, res) => {
	const matchingPatient = patientService.getPatientById(req.params.id);
	if (matchingPatient) {
		res.json(matchingPatient);
	}
	else {
		res.status(404).end();
	}
});

router.post('/', (req, res) => {
	const newPatient = toNewPatient(req.body);
	const addedPatient = patientService.addPatient(newPatient);
	res.json(addedPatient);
});

router.post('/:id/entries', (req, res) => {
	const patient = patientService.getPatientById(req.params.id);
	if (!patient) {
		res.status(404).end();
	} else {
		const body = req.body;
		if (!body || !body.type || !body.description || !body.date || !body.specialist || !body.diagnosisCodes) {
			res.status(400).json({ Error: "Missing or invalid parameters (for BaseEntry)" })
		}
		switch (body.type) {
			case "HealthCheck":
				if (!body.healthCheckRating) {
					res.status(400).json({ Error: "Missing or invalid parameters (for HealthCheckEntry)" });
				}
				break;
			case "OccupationalHealthcare":
				if (!body.employerName) {
					res.status(400).json({ Error: "Missing or invalid parameters (for OccupationalHealthcareEntry)" });
				}
				break;
			case "Hospital":
				if (!body.discharge) {
					res.status(400).json({ Error: "Missing or invalid parameters (for HospitalEntry)" });
				}
				break;
			default:
				throw new Error('Missing parameter \'type\'');
		}

		const id = uuid();
		patient.entries = patient.entries.concat({ ...body, id: id });
		res.json(patient);
	}
})

export default router;