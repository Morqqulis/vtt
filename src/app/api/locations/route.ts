import { NextResponse } from 'next/server'
import prisma from '@/lib/db/prisma'

export async function GET() {
	try {
		const allLocations = await prisma.location.findMany({
			orderBy: {
				code: 'asc',
			},
		})

		return NextResponse.json(allLocations)
	} catch (error) {
		console.error('Error fetching locations:', error)
		return NextResponse.json({ error: 'Failed to fetch locations' }, { status: 500 })
	}
}

export async function POST(request: Request) {
	try {
		const data = await request.json()
		const newLocation = await prisma.location.create({
			data,
		})
		return NextResponse.json(newLocation)
	} catch (error) {
		console.error('Error creating location:', error)
		return NextResponse.json({ error: 'Failed to create location' }, { status: 500 })
	}
}
