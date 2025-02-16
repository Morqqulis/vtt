import prisma from '@/lib/db/prisma'
import { NextResponse } from 'next/server'

export async function PUT(request: Request, { params }: { params: { id: string } }) {
	try {
		const data = await request.json()

		const stationIds = Array.isArray(data.stationIds) ? data.stationIds.map(Number) : []

		const client = await prisma.client.update({
			where: { id: Number(params.id) },
			data: {
				...data,
				stationIds,
			},
		})

		return NextResponse.json(client)
	} catch (error) {
		console.error('Error updating client:', error)
		return NextResponse.json({ error: 'Failed to update client' }, { status: 500 })
	}
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
	try {
		await prisma.client.delete({
			where: { id: Number(params.id) },
		})

		return NextResponse.json({ success: true })
	} catch (error) {
		console.error('Failed to delete client:', error)
		return NextResponse.json({ error: 'Failed to delete client' }, { status: 500 })
	}
}
