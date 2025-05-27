'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useAuth } from './AuthProvider'

// Ice-themed SVG logo component
function IceLogo({ className = "w-8 h-8" }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Ice crystal shape */}
            <path
                d="M16 2L20 8H24L20 14L24 20H20L16 26L12 20H8L12 14L8 8H12L16 2Z"
                fill="url(#iceGradient)"
                stroke="#0c4a6e"
                strokeWidth="1"
            />
            {/* Inner crystal details */}
            <path
                d="M16 6L18 10H20L18 14L20 18H18L16 22L14 18H12L14 14L12 10H14L16 6Z"
                fill="url(#innerGradient)"
                opacity="0.8"
            />
            {/* Center highlight */}
            <circle
                cx="16"
                cy="14"
                r="2"
                fill="white"
                opacity="0.6"
            />

            {/* Gradient definitions */}
            <defs>
                <linearGradient id="iceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7dd3fc" />
                    <stop offset="50%" stopColor="#bae6fd" />
                    <stop offset="100%" stopColor="#e0f2fe" />
                </linearGradient>
                <linearGradient id="innerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e0f2fe" />
                    <stop offset="100%" stopColor="#7dd3fc" />
                </linearGradient>
            </defs>
        </svg>
    )
}

export function Navigation() {
    const { user, signOut } = useAuth()

    const handleSignOut = async () => {
        try {
            await signOut()
            // Redirect to home page after sign out
            window.location.href = '/'
        } catch (error) {
            console.error('Error signing out:', error)
        }
    }

    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/" className="flex items-center space-x-2 text-xl font-bold text-gray-900">
                            <IceLogo />
                            <span>ICE Todo</span>
                        </Link>
                        <div className="hidden md:flex space-x-2">
                            <Button variant="ghost" asChild>
                                <Link href="/">
                                    {user ? 'Dashboard' : 'Home'}
                                </Link>
                            </Button>
                            <Button variant="ghost" asChild>
                                <Link href="/demo">Demo</Link>
                            </Button>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        {user ? (
                            <>
                                <span className="text-sm text-gray-600 hidden sm:block">
                                    {user.email}
                                </span>
                                <Button variant="outline" onClick={handleSignOut}>
                                    Sign Out
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button variant="outline" asChild>
                                    <Link href="/auth/login">Sign In</Link>
                                </Button>
                                <Button asChild>
                                    <Link href="/auth/signup">Sign Up</Link>
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
} 