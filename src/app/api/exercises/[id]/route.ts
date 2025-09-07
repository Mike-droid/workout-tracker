import { NextResponse } from 'next/server';
import { exerciseService } from '@/services/exerciseService';

type Params = {
	params: { id: string };
};

export async function GET(_req: Request, { params }: Params) {
	try {
		const exercise = await exerciseService.getById(params.id);
		if (!exercise) {
			return NextResponse.json(
				{ error: 'Exercise not found' },
				{ status: 404 }
			);
		}
		return NextResponse.json(exercise);
	} catch (error) {
		return NextResponse.json(
			{ error: `Error getting exercise: ${error}` },
			{ status: 500 }
		);
	}
}
