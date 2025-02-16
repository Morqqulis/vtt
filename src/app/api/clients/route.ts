import prisma from '@/lib/db/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const allClients = await prisma.client.findMany()
		return NextResponse.json(allClients)
	} catch (error) {
		console.error('Error fetching clients:', error)
		return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 })
	}
}

export async function POST(request: Request) {
	try {
		const data = await request.json()

		const stationIds = Array.isArray(data.stationIds) ? data.stationIds.map(Number) : []

		const client = await prisma.client.create({
			data: {
				...data,
				stationIds,
			},
		})

		return NextResponse.json(client)
	} catch (error) {
		console.error('Error creating client:', error)
		return NextResponse.json({ error: 'Failed to create client' }, { status: 500 })
	}
}
