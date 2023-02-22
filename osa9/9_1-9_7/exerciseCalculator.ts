interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface ExerciseValues {
    target: number;
    hours: number[];    
}

const parsedArgs = (args: string[]): ExerciseValues => {
    if (args.length < 4) throw new Error('Not enough parameters.');

    let target: number;
    let hours: number[] = [];
    
    args.forEach((value, index) => {
        if (index < 2) return;
        if (isNaN(Number(value))) {
            throw new Error('Parameter "' + value + '" is not a number!');
        }
        if (index === 2) { 
            target = Number(value);
        } else {
            hours.push(Number(value));
        }
    })

    return {        
        target: target,
        hours: hours
    }
}

const calculateExercises = (hours: Array<number>, target: number): ExerciseResult => {    
    const average = hours.reduce((partial, a) => partial + a, 0) / hours.length
    let rating: number;
    if (average < target * 0.8) {
        rating = 1;
    }
    else {
        rating = average < target ? 2 : 3;
    }    
    let desc: string;
    if (rating == 1) {
        desc = 'Poor';
    }
    else if (rating == 2) {
        desc = 'Ok';
    }
    else {
        desc = 'Good';
    }    
    return {
        periodLength: hours.length,
        trainingDays: hours.filter(h => h > 0).length,
        success: average >= target,
        rating: rating,
        ratingDescription: desc,
        target: target,
        average: average
    }
}

try {
    const { target, hours } = parsedArgs(process.argv);
    console.log(calculateExercises(hours, target));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;        
    }
    console.log(errorMessage)
}
//console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))