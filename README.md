# Project Management Dashboard

A full-stack project and task tracking dashboard with planning views, workload insights, and team visibility.

## Overview

This repository combines a Next.js dashboard with an Express REST API and a PostgreSQL database. It supports project and task planning across board, list, table, timeline, and priority-focused views, while Redux Toolkit Query keeps the client synchronized with the backend. The project demonstrates a practical client/server split, relational data modeling, API-driven UI state, and data visualization.

## Screenshots

Screenshots are not included yet. The dashboard depends on a configured PostgreSQL database and seeded data; add captures from a genuine local run under `docs/screenshots/` when that environment is available.

## Features

- Dashboard summaries for task priorities and project status
- Project creation and project-specific navigation
- Drag-and-drop task status updates across a four-column board
- List, data-grid, and Gantt timeline views for project tasks
- Priority work queues for urgent, high, medium, low, and backlog tasks
- Cross-entity search for tasks, projects, and users
- User and team directories with filtering and CSV export controls
- REST endpoints for projects, tasks, users, teams, and search
- Persisted sidebar and dark-mode preferences
- Seed data for demonstrating projects, teams, users, tasks, comments, and attachments

## Tech Stack

### Frontend

- Next.js App Router
- React and TypeScript
- Tailwind CSS
- Material UI and MUI X Data Grid
- Redux Toolkit, RTK Query, React Redux, and Redux Persist
- React DnD
- Recharts and `gantt-task-react`

### Backend

- Node.js and Express
- TypeScript
- Helmet, CORS, and Morgan

### Database

- PostgreSQL
- Prisma ORM with the PostgreSQL driver adapter

## Architecture

```text
Next.js client
  -> RTK Query HTTP requests
  -> Express REST API
  -> Prisma client and PostgreSQL
```

The `client` application owns routing, visualization, local UI preferences, and API caching. The `server` application exposes resource-oriented routes backed by Prisma models for projects, teams, users, tasks, assignments, comments, and attachments. The frontend and backend run as separate processes and are connected through `NEXT_PUBLIC_API_BASE_URL`.

## Getting Started

### Prerequisites

- Node.js and npm
- A PostgreSQL database

### Installation

Clone the repository, then install each workspace independently:

```bash
git clone https://github.com/It-shahin/Project-Management-App.git
cd Project-Management-App

cd server
npm install

cd ../client
npm install
```

### Environment Variables

Create `server/.env`:

```dotenv
DATABASE_URL=
PORT=8000
```

Create `client/.env.local`:

```dotenv
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/
```

Keep real credentials out of version control. Both application directories ignore `.env*` files.

### Database Setup

From the `server` directory:

```bash
npx prisma generate
npx prisma migrate deploy
```

To load the repository's demonstration data, run:

```bash
npm run seed
```

The seed command clears the modeled tables before loading the bundled JSON fixtures, so use it only with a disposable local database.

### Running Locally

Start the API from the `server` directory:

```bash
npm run dev
```

In a second terminal, start the web application from the `client` directory:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The example configuration keeps the API on port `8000` to avoid conflicting with Next.js.

### Available Checks

```bash
# client
npm run lint
npm run build

# server
npm run build
```

The server currently has no automated test suite; its `test` script is still the package scaffold placeholder.

## API Overview

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/projects` | List projects |
| `POST` | `/projects` | Create a project |
| `GET` | `/tasks?projectId={id}` | List tasks for a project |
| `POST` | `/tasks` | Create a task |
| `PATCH` | `/tasks/{taskId}/status` | Update a task's workflow status |
| `GET` | `/tasks/user/{userId}` | List tasks authored by or assigned to a user |
| `GET` | `/search?query={text}` | Search tasks, projects, and users |
| `GET` | `/users` | List users |
| `GET` | `/teams` | List teams with management usernames |

## Project Structure

```text
client/
  app/          Next.js routes and dashboard views
  components/   Shared navigation, modal, and card components
  state/        Redux slice and RTK Query API client

server/
  prisma/       Schema, migrations, seed script, and fixture data
  src/routes/   Express route definitions
  src/controllers/ Request handlers and Prisma queries
```

## Key Technical Highlights

- A normalized Prisma schema models project-team membership, task assignment, authorship, comments, and attachments.
- RTK Query centralizes API calls, cache tags, and invalidation after project creation or task status changes.
- React DnD connects board interactions to a persisted backend status update.
- Recharts, MUI Data Grid, and Gantt views present the same project data for different planning workflows.
- Redux Persist retains display preferences while providing an SSR-safe no-op storage implementation.

## Future Improvements

- Add authentication and role-based authorization before exposing mutation routes.
- Restrict CORS, validate request payloads, and avoid returning raw database error details.
- Centralize Prisma client creation and add automated API and component tests.
- Replace hard-coded demonstration user/project IDs and correct the task form's current validation logic.
- Add an application-level root script or workspace configuration to run both services together.

## Author

**Chahin Boudra**

- GitHub: [It-shahin](https://github.com/It-shahin)
- LinkedIn: [chahin-boudra](https://www.linkedin.com/in/chahin-boudra/)
