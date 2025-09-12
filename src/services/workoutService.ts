import prisma from '@/lib/prisma';

export const workoutService = {
	async createWorkout(data: {
		userId: string;
		date?: string;
		notes?: string;
		exercises: {
			exerciseId: string;
			sets: number;
			reps: number;
			weight?: number;
		}[];
	}) {
		return prisma.workoutSession.create({
			data: {
				date: data.date ? new Date(data.date) : new Date(),
				notes: data.notes,
				userId: data.userId,
				exercises: {
					create: data.exercises.map((ex) => ({
						sets: ex.sets,
						reps: ex.reps,
						weight: ex.weight,
						exerciseId: ex.exerciseId,
					})),
				},
			},
			include: {
				exercises: {
					include: { exercise: true },
				},
			},
		});
	},

	getWorkoutsByUserId(userId: string) {
		return prisma.workoutSession.findMany({
			where: {
				userId,
			},
			include: {
				exercises: {
					include: { exercise: true },
				},
			},
		});
	},
};
