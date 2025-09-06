import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

export function middleware(req: NextRequest, res: NextResponse) {
	const protectedRoutes = ['/api/workouts'];

	if (protectedRoutes.some((path) => req.nextUrl.pathname.startsWith(path))) {
		const authHeader = req.headers.get('authorization');
		if (!authHeader || !authHeader.startsWith('Bearer')) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}
		const token = authHeader.split(' ')[1];
		try {
			jwt.verify(token, JWT_SECRET);
		} catch (error) {
			return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
		}
	}

	return NextResponse.next();
}
