import { useParams } from "react-router-dom";
import { useState } from "react";
import patients from "../services/patients";
import { Patient } from "../types";
import { Male, Female } from '@mui/icons-material';


const PatientInfo = (): JSX.Element => {	
	const [result, setResult] = useState<JSX.Element>(<div>Loading...</div>);
	const [loaded, setLoaded] = useState(false);

	const id = useParams().id;
	if (!id) {
		return <div>no id</div>;
	}

	const drawGender = (gender: string) => {
		if (gender.toLowerCase() == 'male') {
			return <Male />;
		}
		else if (gender.toLocaleLowerCase() == 'female') {
			return <Female />;
		}
		else {
			return '(Gender: Other)';
		}
	}
	
	if (!loaded) {
		const patientPromise: Promise<Patient> = patients.getById(id);
		patientPromise.then((patient: Patient) => {
			console.log('patient:', patient);
			
			setResult(
				<div>
					<h3>{patient.name}{' '}{drawGender(patient.gender)}</h3>
					<b>SSN:</b> {patient.ssn}
					<br />	
					<b>Occupation:</b> {patient.occupation}
				</div>
			);			
			setLoaded(true);
		});
	}
	
	return result;
}

export default PatientInfo;