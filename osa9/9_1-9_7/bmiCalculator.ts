interface BmiValues {
	heightCm: number;
	weightKg: number;
}

const parsedArguments = (args: string[]): BmiValues => {
	if (args.length < 4) throw new Error('Not enough parameters');
	if (args.length > 4) throw new Error('Too many parameters');

	if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
		return {
			heightCm: Number(args[2]),
			weightKg: Number(args[3])
		}
	}
	else {
		throw new Error('Provided values are not numbers!');
	}
}

const calculateBmi = (heightCm: number, weightKg: number): string => {	
	const bmi = weightKg / Math.pow(heightCm / 100, 2);
	if (bmi <= 16) {
		return 'Underweight (Severe thinness)';
	}
	else if (bmi <= 16.95) {
		return 'Underweight (Moderate thinness)';
	}
	else if (bmi <= 18.45) {
		return 'Underweight (Mild thinness)';
	}
	else if (bmi <= 24.95) {
		return 'Normal (healthy weight)';
	}
	else if (bmi <= 29.95) {
		return 'Overweight (Pre-obese)';
	}
	else if (bmi <= 34.95) {
		return 'Obese (Class I)';
	}
	else if (bmi <= 39.95) {
		return 'Obese (Class II)';
	}
	else {
		return 'Obese (Class III)';
	}
}

try {
	const { heightCm, weightKg } = parsedArguments(process.argv)
	console.log(calculateBmi(heightCm, weightKg))
} catch (error: unknown) {
	let errorMessage = 'Something bad happened.';
	if (error instanceof Error) {
		errorMessage += ' Error: ' + error.message;
	}
	console.log(errorMessage);
}

export default calculateBmi