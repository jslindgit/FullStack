import express from 'express';
const app = express();

import calculateBmi from './bmiCalculator';

app.get('/', (_req, res) => {
	res.send('/hello /bmi')
})
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
		res.json({ weight: weight, height: height, bmi: bmi })
	}
})

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
})