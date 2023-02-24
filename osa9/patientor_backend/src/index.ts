import express from 'express';
import diagnoseRouter from './routes/diagnoseRouter';
import patientRouter from './routes/patientRouter';
const app = express();
app.use(express.json());
import cors from 'cors';
app.use(cors());

const PORT = 3001;

app.get('/', (_req, res) => {
	res.status(200).send('patientor backend');
});

app.get('/api/ping', (_req, res) => {
	console.log('someone pinged here');
	res.status(200).send('pong');
});

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});