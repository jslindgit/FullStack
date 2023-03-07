import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';
import { toNewEntry } from '../utils';
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
		res.status(404).json({ Error: 'Cannot find a Patient with the id ' + req.params.id });
	} else {
		const newEntry = toNewEntry(req.body);
		patient.entries = patient.entries.concat({ ...newEntry, id: uuid() });
		res.json(patient);
	}
});

export default router;