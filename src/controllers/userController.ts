import { NextResponse } from 'next/server';
import { userService } from '@/services/userService';
import prisma from '@/lib/prisma';

export const userController = {
	async register(req: Request) {
		try {
			const { email, password, name } = await req.json();
			if (!email || !password || !name) {
				throw new Error('Email, password and name are required');
			}

			const existingUser = await prisma.user.findUnique({ where: { email } });
			if (existingUser) {
				throw new Error('User already exists');
			}

			await userService.register(email, password, name);
			return NextResponse.json({ message: 'User registered' });
		} catch (error) {
			return NextResponse.json(
				{ error: `Error registering user: ${error}` },
				{ status: 500 }
			);
		}
	},

	async login(req: Request) {
		try {
			const { email, password } = await req.json();
			if (!email || !password) {
				throw new Error('Email and password are required');
			}
			const { token } = await userService.login(email, password);
			return NextResponse.json({ token });
		} catch (error) {
			return NextResponse.json(
				{ error: `Error logging in user: ${error}` },
				{ status: 500 }
			);
		}
	},
};
