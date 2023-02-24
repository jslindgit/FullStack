import express from 'express';
import diagnoseService from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req, res) => {
	res.status(200).json(diagnoseService.getDiagnoses());
});

router.post('/', (_req, res) => {
	res.send('Saving a diagnose!');
});

export default router;