import { PrismaClient } from '../prisma/generated';

const prisma = new PrismaClient();

async function main() {
	const exercises = [
		{
			name: 'Barbell Squat',
			muscleGroup: 'Legs',
		},
		{
			name: 'Dumbbell Bench Press',
			muscleGroup: 'Chest',
		},
		{
			name: 'Barbell Bench Press',
			muscleGroup: 'Chest',
		},
		{
			name: 'Barbell Deadlift',
			muscleGroup: 'Back',
		},
		{
			name: 'Barbell Row',
			muscleGroup: 'Back',
		},
		{
			name: 'Barbell Curl',
			muscleGroup: 'Biceps',
		},
		{
			name: 'Dumbbell Curl',
			muscleGroup: 'Biceps',
		},
		{
			name: 'Pull up',
			muscleGroup: 'Back',
		},
		{
			name: 'Push up',
			muscleGroup: 'Chest',
		},
		{
			name: 'Dumbbell Fly',
			muscleGroup: 'Chest',
		},
		{
			name: 'Hack squat',
			muscleGroup: 'Legs',
		},
		{
			name: 'Machine Hip Thrust',
			muscleGroup: 'Legs',
		},
		{
			name: 'Overhead Barbell Press',
			muscleGroup: 'Shoulders',
		},
		{
			name: 'Overhead Dumbbell Press',
			muscleGroup: 'Shoulders',
		},
		{
			name: 'Dumbbell Lunge',
			muscleGroup: 'Legs',
		},
		{
			name: 'Bulgarian Split Squat',
			muscleGroup: 'Legs',
		},
		{
			name: 'Leg Press',
			muscleGroup: 'Legs',
		},
		{
			name: 'Cable Tricep Extension',
			muscleGroup: 'Triceps',
		},
		{
			name: 'Lateral Raise',
			muscleGroup: 'Shoulders',
		},
	];

	for (const exercise of exercises) {
		await prisma.exercise.upsert({
			where: { name: exercise.name },
			update: {},
			create: exercise,
		});
	}

	console.log('Seed completed for exercises');
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => await prisma.$disconnect());
