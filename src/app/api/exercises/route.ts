import { NextResponse } from 'next/server';
import { exerciseService } from '@/services/exerciseService';

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const query = searchParams.get('q');

		if (query) {
			const results = await exerciseService.getByName(query);

			if (!results || results.length === 0) {
				return NextResponse.json(
					{ error: `Exercise ${query} not found` },
					{ status: 404 }
				);
			}
			return NextResponse.json(results);
		}

		const exercises = await exerciseService.getAll();
		return NextResponse.json(exercises);
	} catch (error) {
		return NextResponse.json(
			{ error: `Error getting exercises: ${error}` },
			{ status: 500 }
		);
	}
}
