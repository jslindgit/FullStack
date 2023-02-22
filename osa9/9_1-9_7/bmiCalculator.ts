const calculateBmi = (heightCm: number, weightKg: number): string => {	
	const bmi = weightKg / Math.pow(heightCm / 100, 2)
	if (bmi <= 16) {
		return 'Underweight (Severe thinness)'
	}
	else if (bmi <= 16.95) {
		return 'Underweight (Moderate thinness)'
	}
	else if (bmi <= 18.45) {
		return 'Underweight (Mild thinness)'
	}
	else if (bmi <= 24.95) {
		return 'Normal (healthy weight)'
	}
	else if (bmi <= 29.95) {
		return 'Overweight (Pre-obese)'
	}
	else if (bmi <= 34.95) {
		return 'Obese (Class I)'
	}
	else if (bmi <= 39.95) {
		return 'Obese (Class II)'
	}
	else {
		return 'Obese (Class III)'
	}
}

console.log(calculateBmi(180, 74))