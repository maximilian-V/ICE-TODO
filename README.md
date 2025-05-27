# ICE Score Kanban Board

A modern kanban board application built with Next.js, Supabase, and shadcn/ui that helps you prioritize tasks using the ICE scoring method.

## Features

- **User Authentication**: Secure sign-up and sign-in with Supabase Auth
  - Email/password authentication
  - Google OAuth integration
  - Persistent sessions across devices
  - Secure user data isolation

- **ICE Scoring System**: Prioritize tasks based on:
  - **Impact**: How much value does this generate? (1-10)
  - **Confidence**: How certain am I it will work? (1-10)
  - **Ease**: How hard is it to do? (1-10)
  - **ICE Score**: Automatically calculated as Impact × Confidence × Ease

- **Subtasks Management**: Break down complex tasks into smaller pieces:
  - Add multiple subtasks to any task
  - Mark subtasks as completed with checkboxes
  - Visual progress bar showing completion percentage
  - Edit or remove subtasks as needed

- **Drag & Drop**: Easily move tasks between columns (To Do, In Progress, Done)
- **Auto-sorting**: Tasks within each column are automatically sorted by ICE score (highest first)
- **Task Management**: Create, edit, and delete tasks with full CRUD functionality
- **Beautiful UI**: Modern, responsive design using shadcn/ui components
- **Real-time Sync**: Tasks are saved to Supabase and sync across all your devices
- **Visual Indicators**: 
  - Color-coded ICE scores:
    - Green: High priority (ICE ≥ 500)
    - Yellow: Medium priority (ICE ≥ 200)
    - Red: Low priority (ICE < 200)
  - Progress bars for subtask completion

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- A Supabase account and project

### Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd ice-todo
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Add your Supabase project URL and anon key:
```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

4. Set up your Supabase database:
   - Run the SQL commands in `supabase-setup.sql` in your Supabase SQL editor
   - This will create the necessary tables and Row Level Security policies

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Getting Started
1. Visit the homepage and click "Get Started Free" or "Sign Up"
2. Create an account with your email or sign in with Google
3. Start creating and organizing your tasks!

### Creating Tasks

1. Click the "+" button in any column header
2. Enter task title and description (optional)
3. Add subtasks (optional):
   - Type subtask title and press Enter or click the "+" button
   - Add as many subtasks as needed
   - Remove subtasks with the "X" button
4. Set Impact, Confidence, and Ease scores using the sliders
5. The ICE score is calculated automatically
6. Click "Create Task" to add the task

### Managing Tasks

- **Edit**: Click the edit icon on any task card
- **Delete**: Click the trash icon on any task card
- **Move**: Drag and drop tasks between columns or reorder within columns
- **Complete Subtasks**: Click the checkbox next to any subtask to mark it as complete

### Working with Subtasks

- Subtasks appear within each task card
- A progress bar shows the completion percentage
- Completed subtasks are crossed out
- The subtask counter shows "completed/total" format
- Edit subtasks by clicking the edit icon on the parent task

### Understanding ICE Scores

- **Impact (1-10)**: The potential value or benefit of completing this task
- **Confidence (1-10)**: Your certainty that the task will achieve its intended outcome
- **Ease (1-10)**: How easy or quick the task is to complete (higher = easier)

The final ICE score ranges from 1 to 1000, with higher scores indicating higher priority tasks.

## Authentication

The app uses Supabase Auth for secure user authentication:

- **Email/Password**: Traditional sign-up and sign-in
- **Google OAuth**: One-click sign-in with Google
- **Session Management**: Automatic session refresh and persistence
- **Security**: Row Level Security ensures users can only access their own data

## Database Schema

The app uses two main tables:

- **tasks**: Stores task information including ICE scores and user association
- **subtasks**: Stores subtask information linked to parent tasks

All data is protected by Row Level Security policies that ensure users can only access their own tasks and subtasks.

## Tech Stack

- **Framework**: Next.js 15.3.2
- **Database & Auth**: Supabase
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS v4
- **Drag & Drop**: @dnd-kit
- **Icons**: Lucide React
- **TypeScript**: For type safety

## Project Structure

```
ice-todo/
├── app/
│   ├── auth/                  # Authentication pages
│   │   ├── login/
│   │   ├── signup/
│   │   └── callback/
│   ├── components/
│   │   ├── KanbanBoard.tsx    # Main authenticated kanban board
│   │   ├── KanbanColumn.tsx   # Individual column component
│   │   ├── TaskCard.tsx       # Task card with subtasks
│   │   ├── TaskFormDialog.tsx # Task creation/edit dialog
│   │   ├── Navigation.tsx     # Context-aware navigation
│   │   └── LandingPage.tsx    # Landing page for unauthenticated users
│   ├── types/
│   │   └── kanban.ts          # TypeScript interfaces
│   ├── demo/                  # Demo page without authentication
│   ├── page.tsx               # Main page with auth routing
│   ├── layout.tsx             # Root layout
│   └── globals.css            # Global styles
├── lib/
│   ├── services/
│   │   └── tasks.ts           # Task service for database operations
│   ├── supabase/              # Supabase client configuration
│   └── utils.ts               # Utility functions
├── components/ui/             # shadcn/ui components
└── supabase-setup.sql         # Database setup script
```

## Demo

Try the demo version without authentication at `/demo` to see how the kanban board works before signing up.

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the MIT License.
