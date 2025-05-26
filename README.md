# ICE Score Kanban Board

A modern kanban board application built with Next.js and shadcn/ui that helps you prioritize tasks using the ICE scoring method.

## Features

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

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

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

## Tech Stack

- **Framework**: Next.js 15.3.2
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS v4
- **Drag & Drop**: @dnd-kit
- **Icons**: Lucide React
- **TypeScript**: For type safety

## Project Structure

```
ice-todo/
├── app/
│   ├── components/
│   │   ├── KanbanBoard.tsx    # Main kanban board component
│   │   ├── KanbanColumn.tsx   # Individual column component
│   │   ├── TaskCard.tsx       # Task card component with subtasks
│   │   └── TaskFormDialog.tsx # Task creation/edit dialog with subtask management
│   ├── types/
│   │   └── kanban.ts          # TypeScript interfaces including Subtask
│   ├── page.tsx               # Main page
│   ├── layout.tsx             # Root layout
│   └── globals.css            # Global styles
├── components/ui/             # shadcn/ui components
└── lib/                       # Utility functions
```

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the MIT License.
