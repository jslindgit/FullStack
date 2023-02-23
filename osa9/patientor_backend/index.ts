import express from 'express';
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

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});