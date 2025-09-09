import prisma from '@/lib/prisma';

export const exerciseService = {
	async getAll() {
		return prisma.exercise.findMany();
	},

	async getById(id: string) {
		return prisma.exercise.findUnique({ where: { id } });
	},

	async getByName(name: string) {
		return prisma.exercise.findMany({
			where: { name: { contains: name, mode: 'insensitive' } },
		});
	},

	async getByMuscleGroup(muscleGroup: string) {
		return prisma.exercise.findMany({ where: { muscleGroup } });
	},
};
