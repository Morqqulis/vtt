import prisma from '@/lib/db/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const stationId = searchParams.get('stationId')

	if (!stationId) {
		return NextResponse.json({ error: 'Station ID is required' }, { status: 400 })
	}

	const stationPrompts = await prisma.station.findUnique({
		where: {
			id: parseInt(stationId),
		},
		select: {
			id: true,
			systemPrompt: true,
			hourlyPrompt0: true,
			hourlyPrompt10: true,
			hourlyPrompt20: true,
			hourlyPrompt30: true,
			hourlyPrompt40: true,
			hourlyPrompt50: true,
			hourlyPrompt55: true,
			newsPrompt: true,
			weatherPrompt: true,
			trafficPrompt: true,
		},
	})

	return NextResponse.json(stationPrompts)
}

export async function PUT(request: Request) {
	try {
		const { id, ...data } = await request.json()
		const updatedPrompts = await prisma.station.update({
			where: { id: parseInt(id) },
			data,
		})

		return NextResponse.json(updatedPrompts)
	} catch (error) {
		console.error('Error updating prompts:', error)
		return NextResponse.json({ error: 'Failed to update prompts' }, { status: 500 })
	}
}
