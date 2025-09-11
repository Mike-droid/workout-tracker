import { NextResponse } from 'next/server';
import { workoutService } from '@/services/workoutService';
import { verifyJWT } from '@/lib/auth';

export async function POST(req: Request) {
	try {
		const authHeader = req.headers.get('authorization');
		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
		}
		const token = authHeader.split(' ')[1];
		const payload = await verifyJWT<{ userId: string }>(token);

		if (!payload) {
			return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
		}

		const body = await req.json();

		const workout = await workoutService.createWorkout({
			userId: payload.userId,
			date: body.date,
			notes: body.notes,
			exercises: body.exercises,
		});

		return NextResponse.json(workout, { status: 201 });
	} catch (error) {
		return NextResponse.json(
			{ error: `Error creating workout: ${error}` },
			{ status: 500 }
		);
	}
}
