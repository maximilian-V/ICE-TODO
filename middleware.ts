import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Skip middleware for static files and API routes
    if (
        pathname.startsWith('/_next/') ||
        pathname.startsWith('/api/') ||
        pathname.includes('.') // Static files
    ) {
        return NextResponse.next()
    }

    // Update session and get response
    const response = await updateSession(request)

    // In production, block access to debug and test pages
    if (process.env.NODE_ENV === 'production') {
        if (pathname.startsWith('/debug') || pathname.startsWith('/test-')) {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }

    // For now, allow all routes since we're using client-side auth
    // In a more secure setup, you would check authentication here
    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
} 