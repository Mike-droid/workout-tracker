import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

export const userService = {
	async register(email: string, password: string, name: string) {
		const hashedPassword = await bcrypt.hash(password, 10);

		await prisma.user.create({
			data: {
				email,
				passwordHash: hashedPassword,
				name,
			},
		});
	},

	async login(email: string, password: string) {
		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) {
			throw new Error('Email or password incorrect');
		}
		const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

		if (!isPasswordValid) {
			throw new Error('Email or password incorrect');
		}

		const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
			expiresIn: '7d',
		});

		return { token };
	},

	async getById(id: string) {
		return prisma.user.findUnique({ where: { id } });
	},
};
