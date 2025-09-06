import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

export async function POST(req: Request) {
	try {
		const { email, password } = await req.json();

		if (!email || !password) {
			return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
		}

		const user = await prisma.user.findUnique({ where: { email } });

		if (!user) {
			return NextResponse.json(
				{ error: 'User or password incorrect' },
				{ status: 404 }
			);
		}

		const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

		if (!isPasswordValid) {
			return NextResponse.json(
				{ error: 'User or password incorrect' },
				{ status: 401 }
			);
		}

		const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });

		return NextResponse.json({ token });
	} catch (error) {
		return NextResponse.json(
			{ error: `Internal server error: ${error}` },
			{ status: 500 }
		);
	}
}
