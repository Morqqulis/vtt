import prisma from '@/lib/db/prisma'
import { NextResponse } from 'next/server'

export async function PUT(request: Request, { params }: { params: { id: string } }) {
	try {
		const data = await request.json()
		const id = parseInt(params.id)

		const updatedLocation = await prisma.location.update({
			where: { id },
			data,
		})

		if (!updatedLocation) {
			return NextResponse.json({ error: 'Location not found' }, { status: 404 })
		}

		return NextResponse.json(updatedLocation)
	} catch (error) {
		console.error('Error updating location:', error)
		return NextResponse.json({ error: 'Failed to update location' }, { status: 500 })
	}
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
	try {
		const id = parseInt(params.id)

		const deletedLocation = await prisma.location.delete({
			where: { id },
		})

		if (!deletedLocation) {
			return NextResponse.json({ error: 'Location not found' }, { status: 404 })
		}

		return NextResponse.json(deletedLocation)
	} catch (error) {
		console.error('Error deleting location:', error)
		return NextResponse.json({ error: 'Failed to delete location' }, { status: 500 })
	}
}
