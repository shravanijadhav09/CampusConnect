# CampusConnect

CampusConnect is a campus event platform for discovering, registering for, and managing university events.

## Features

- Browse upcoming campus events
- Search events and filter them by category
- Register for events while signed in
- Save events for later from the events page
- View registered and saved events on the dashboard
- User registration and JWT-based login
- Admin event creation, editing, and deletion
- Admin view of event registrations
- Responsive React interface with a clean glassmorphism-inspired design

## Tech Stack

- Frontend: React, Vite, React Router, Axios
- Backend: Node.js, Express, JWT, bcryptjs
- Database: PostgreSQL

## Project Structure

```text
CampusConnect/
|-- backend/       Express API and PostgreSQL integration
|-- frontend/      React and Vite client application
|-- image/         Branding assets
|-- README.md
```

## Requirements

- Node.js 18 or newer
- npm
- PostgreSQL

## Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/shravanijadhav09/CampusConnect.git
cd CampusConnect
```

### 2. Install dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 3. Configure the backend

Create `backend/.env`:

```env
PORT=5000
DB_USER=postgres
DB_HOST=localhost
DB_NAME=campusconnect
DB_PASSWORD=your_postgres_password
DB_PORT=5432
JWT_SECRET=replace_with_a_long_random_secret
```

Create a PostgreSQL database named `campusconnect` and add the required `users`, `events`, and `registrations` tables.

### 4. Start the application

Open two terminals from the project root.

Backend:

```bash
cd backend
npm start
```

Frontend:

```bash
cd frontend
npm run dev
```

Open the local URL shown by Vite, usually `http://localhost:5173`.

## Available Scripts

### Frontend

```bash
npm run dev       # Start the Vite development server
npm run build     # Create a production build
npm run lint      # Run ESLint
```

### Backend

```bash
npm start         # Start the API server
npm run dev       # Start the API with file watching
```

## API Overview

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/events` | List events |
| GET | `/api/events/:id` | Get one event |
| POST | `/api/auth/register` | Create an account |
| POST | `/api/auth/login` | Log in |
| POST | `/api/registrations/events/:eventId/register` | Register for an event |
| GET | `/api/registrations/my` | Get the signed-in user's registrations |
| POST | `/api/admin/events` | Create an event as an admin |
| PUT | `/api/admin/events/:id` | Update an event as an admin |
| DELETE | `/api/admin/events/:id` | Delete an event as an admin |

Protected endpoints require a JWT in the `Authorization` header:

```text
Authorization: Bearer <token>
```

## Deployment Notes

- Deploy the backend and frontend as separate services.
- Set production database credentials and a new strong `JWT_SECRET` in the backend provider.
- Replace frontend `localhost:5000` API URLs with the deployed backend URL before building for production.
- Restrict backend CORS to the deployed frontend domain.
- Set the frontend build command to `npm run build` and publish the `frontend/dist` directory.
- Never commit `.env` files or production secrets.

## License

This project is for educational and campus project use.

