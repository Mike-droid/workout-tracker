import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function middleware(req: NextRequest) {
	const protectedRoutes = ['/api/workouts'];

	if (protectedRoutes.some((path) => req.nextUrl.pathname.startsWith(path))) {
		const authHeader = req.headers.get('authorization');

		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const token = authHeader.split(' ')[1];

		try {
			const secret = new TextEncoder().encode(JWT_SECRET);
			const { payload } = await jwtVerify(token, secret);

			// Agregar el payload a los headers para que el endpoint lo use
			const requestHeaders = new Headers(req.headers);
			requestHeaders.set('x-user-payload', JSON.stringify(payload));

			return NextResponse.next({
				request: { headers: requestHeaders },
			});
		} catch (error) {
			return NextResponse.json({ error: `Invalid token: ${error}` }, { status: 401 });
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/api/workouts/:path*'],
};
