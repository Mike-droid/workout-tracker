import { NextResponse } from 'next/server';
import { userService } from '@/services/userService';

export async function POST(req: Request) {
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
}
