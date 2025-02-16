import prisma from '@/lib/db/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const allVoices = await prisma.voice.findMany()
		return NextResponse.json(allVoices)
	} catch (error) {
		console.error('Failed to fetch voices:', error)
		return NextResponse.json({ error: 'Failed to fetch voices' }, { status: 500 })
	}
}

export async function POST(request: Request) {
	try {
		const body = await request.json()
		const result = await prisma.voice.create({
			data: body,
		})
		return NextResponse.json(result)
	} catch (error) {
		console.error('Failed to create voice:', error)
		return NextResponse.json({ error: 'Failed to create voice' }, { status: 500 })
	}
}
