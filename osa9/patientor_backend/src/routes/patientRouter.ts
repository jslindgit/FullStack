import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

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

export default router;