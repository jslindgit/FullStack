import { useParams } from "react-router-dom";
import patients from "../services/patients";
import { Patient } from "../types";

const PatientInfo = (): JSX.Element => {
	const id = useParams().id;	
	const patientPromise: Promise<Patient> | undefined = id ? patients.getById(id) : undefined;
	
	if (patientPromise) {		
		patientPromise.then((patient: Patient) => {
			console.log('patient:', patient);
			return (
				<div>
					<h3>{patient.name}</h3>
				</div>
			)
		})
	}

	return (
		<div>
			<h3>No patient found with the given ID.</h3>
		</div>
	)
}

export default PatientInfo