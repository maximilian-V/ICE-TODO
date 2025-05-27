'use client'

import { KanbanBoard } from './components/KanbanBoard'
import { Navigation } from './components/Navigation'
import { LandingPage } from './components/LandingPage'
import { useAuth } from './components/AuthProvider'

export default function Home() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  // Show landing page for unauthenticated users
  if (!user) {
    return (
      <>
        <Navigation />
        <LandingPage />
      </>
    )
  }

  // Show kanban board for authenticated users
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto p-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">ICE Score Kanban Board</h1>
          <p className="text-gray-600 mt-2">
            Prioritize your tasks using Impact, Confidence, and Ease scores
          </p>
        </header>
        <main className="h-[calc(100vh-200px)]">
          <KanbanBoard />
        </main>
      </div>
    </div>
  )
}
