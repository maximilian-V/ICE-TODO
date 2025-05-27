import { NextResponse } from 'next/server'

export async function middleware() {
    // Completely disabled middleware for debugging
    console.log('[Middleware] Bypassed - debugging auth issues')
    return NextResponse.next()
}

export const config = {
    // Disable middleware entirely for now
    matcher: [],
} 