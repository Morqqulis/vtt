import { db } from '@/lib/db/olg.config'
import { settings } from '@/lib/db/schema'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function apiAuthMiddleware(request: NextRequest) {
  // Skip auth for login and non-API routes
  if (!request.url.includes('/api/') || request.url.includes('/api/auth/')) {
    return NextResponse.next()
  }

  const apiKey = request.headers.get('X-API-Key')
  
  if (!apiKey) {
    return NextResponse.json(
      { error: 'API key is required' },
      { status: 401 }
    )
  }

  try {
    // Get the stored API key from settings
    const settingsData = await db.select().from(settings).limit(1)
    const validApiKey = settingsData[0]?.apiKey

    if (!validApiKey || apiKey !== validApiKey) {
      return NextResponse.json(
        { error: 'Invalid API key' },
        { status: 401 }
      )
    }

    return NextResponse.next()
  } catch (error) {
    console.error('API auth error:', error)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
} 