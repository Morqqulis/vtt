// import prisma from '@/lib/db/prisma'
// import { cookies } from 'next/headers'
// import { NextResponse } from 'next/server'

// // Remove this deprecated config
// // export const config = {
// //   api: {
// //     bodyParser: true,
// //   },
// // }

// // Instead, use the new route segment config
// export const dynamic = 'force-dynamic'

// export async function GET() {
//   // Only allow authenticated admin users to get settings
//   const isAuthenticated = cookies().get('auth')?.value === 'true'
//   if (!isAuthenticated) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//   }

// 	try {
// 		const settingsData = await prisma.settings.findFirst()
// 		return NextResponse.json(settingsData || {})
// 	} catch (error) {
// 		console.error('Failed to fetch settings:', error)
// 		return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
// 	}
// }

// export async function POST(request: Request) {
//   // Only allow authenticated admin users to update settings
//   const isAuthenticated = cookies().get('auth')?.value === 'true'
//   if (!isAuthenticated) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//   }

//   try {
//     const body = await request.json()
//     const result = await db
//       .insert(settings)
//       .values(body)
//       .onConflictDoUpdate({
//         target: settings.id,
//         set: body,
//       })
//       .returning()

//     return NextResponse.json(result[0])
//   } catch (error) {
//     console.error('Failed to update settings:', error)
//     return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
//   }
// } 