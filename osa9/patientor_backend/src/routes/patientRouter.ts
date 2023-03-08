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
		try {
			const newEntry = { ...toNewEntry(req.body), id: uuid() };
			patient.entries = [newEntry].concat(patient.entries);
			res.json(newEntry);
		} catch (error: unknown) {
			if (error instanceof Error) {
				res.status(400).json({ Error: error.message });
			}
		}
	}
});

export default router;