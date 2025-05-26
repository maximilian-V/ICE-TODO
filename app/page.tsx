import { KanbanBoard } from './components/KanbanBoard';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
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
  );
}
