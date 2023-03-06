import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { Diagnosis, Patient } from "./types";

import patientService from "./services/patients";
import diagnosesService from './services/diagnosesService';
import PatientListPage from "./components/PatientListPage";
import PatientInfo from "./components/PatientInfo";

const App = () => {
	const [patients, setPatients] = useState<Patient[]>([]);
	const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
	const [loaded, setLoaded] = useState<boolean>(false);

	useEffect(() => {
		void axios.get<void>(`${apiBaseUrl}/ping`);

		const fetchPatientList = async () => {
			const patients = await patientService.getAll();
			setPatients(patients);
		};
		void fetchPatientList();

		const fetchDiagnoses = async () => {
			const diagnoses = await diagnosesService.getAll();
			setDiagnoses(diagnoses);
			setLoaded(true);
		};
		void fetchDiagnoses();
	}, []);

	if (!loaded) {
		return <div>Loading...</div>
	}
	else {
		return (
			<div className="App">
				<Router>
					<Container>
						<Typography variant="h3" style={{ marginBottom: "0.5em" }}>
							Patientor
						</Typography>
						<Button component={Link} to="/" variant="contained" color="primary">
							Home
						</Button>
						<Divider hidden />
						<Routes>
							<Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
							<Route path="/:id" element={<PatientInfo diagnoses={diagnoses} />} />
						</Routes>
					</Container>
				</Router>
			</div>
		);
	}
};

export default App;
