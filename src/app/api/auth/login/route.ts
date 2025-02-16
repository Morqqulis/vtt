import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const body = await request.json()
		const { username, password } = body

		// Check against environment variables
		if (
			username === process.env.ADMIN_USERNAME &&
			password === process.env.ADMIN_PASSWORD
		) {
			// Set auth cookie
			cookies().set('auth_token', 'authenticated', {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'lax',
				maxAge: 60 * 60 * 24 * 7, // 1 week
			})

			return NextResponse.json({ success: true })
		}

		return NextResponse.json(
			{ error: 'Invalid credentials' },
			{ status: 401 }
		)
	} catch (error) {
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}
