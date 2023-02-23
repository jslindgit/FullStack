import express from 'express';
const app = express();
app.use(express.json());

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const isNumberarray = (arr: number[]): boolean => {
	if (!Array.isArray(arr)) {
		return false;
	}
	let ok = true;
	arr.forEach((value) => {
		if (typeof value !== 'number') {
			ok = false;
		}
	})
	return ok;
}

app.get('/', (_req, res) => {
	res.send('/hello /bmi');
});
app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack!');
});
app.get('/bmi', (req, res) => {
	const weight = Number(req.query.weight);
	const height = Number(req.query.height);
	if (!weight || !height) {
		res.status(400).json({ error: 'malformatted parameters' });
	} else {	
		const bmi = calculateBmi(height, weight);
		res.json({ weight: weight, height: height, bmi: bmi });
	}
});

app.post('/exercises', (req, res) => {	
	const daily = req.body.daily_exercises;
	const target = req.body.target;
	if (!daily || !target) {
		res.status(400).json({ error: 'parameters missing' });
	}
	else if (isNaN(Number(target)) || !isNumberarray(daily)) {
		res.status(400).json({ error: 'malformatted parameters' });
	}
	else {
		res.json(calculateExercises(req.body.daily_exercises, req.body.target));
	}
});

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});