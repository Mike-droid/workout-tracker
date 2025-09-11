import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function signJWT(payload: Record<string, unknown>) {
	const secret = new TextEncoder().encode(JWT_SECRET);

	return await new SignJWT(payload)
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime('5h')
		.sign(secret);
}

export async function verifyJWT<T>(token: string): Promise<T | null> {
	try {
		const secret = new TextEncoder().encode(JWT_SECRET);
		const { payload } = await jwtVerify(token, secret);
		return payload as T;
	} catch (error) {
		console.error('JWT verification failed:', error);
		return null;
	}
}
