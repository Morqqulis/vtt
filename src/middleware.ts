import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
	// Add debug logging
	// console.log('Middleware path:', request.nextUrl.pathname)
	// console.log('Auth cookie:', request.cookies.get('auth_token')?.value)

	const isAuthenticated = request.cookies.has('auth_token')
	const isLoginPage = request.nextUrl.pathname === '/login'
	const isApiAuthRoute = request.nextUrl.pathname.startsWith('/api/auth/')
	const isPublicRoute =
		request.nextUrl.pathname === '/' ||
		request.nextUrl.pathname.startsWith('/_next') ||
		request.nextUrl.pathname.startsWith('/api/auth/')

	// Allow public routes to bypass auth check
	if (isPublicRoute) {
		return NextResponse.next()
	}

	if (!isAuthenticated && !isLoginPage) {
		// Redirect to login if not authenticated
		return NextResponse.redirect(new URL('/login', request.url))
	}

	if (isAuthenticated && isLoginPage) {
		// Redirect to dashboard if already authenticated
		return NextResponse.redirect(new URL('/dashboard', request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		'/((?!api|_next/static|_next/image|favicon.ico).*)',
	],
}
