import { NextResponse } from 'next/server';
import { exerciseService } from '@/services/exerciseService';

export async function GET() {
	try {
		const exercises = await exerciseService.getAll();
		return NextResponse.json(exercises);
	} catch (error) {
		return NextResponse.json(
			{ error: `Error getting exercises: ${error}` },
			{ status: 500 }
		);
	}
}
