# Contract Management Platform - Setup Guide

## Quick Start with Docker (Recommended)

### 1. Start all services
```bash
docker-compose up -d
```

This command will:
- Start PostgreSQL database
- Create the `contract_db` database
- Start the backend API
- Start the frontend application

### 2. Access the application
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api
- Health check: http://localhost:5000/api/health

---

## Manual Setup (Without Docker)

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm

### Step 1: Install PostgreSQL
- Download and install from https://www.postgresql.org/download/
- Remember the superuser password you set during installation

### Step 2: Create Database and User
Open PostgreSQL command line and run:
```sql
CREATE DATABASE contract_db;
CREATE USER postgres WITH PASSWORD 'password';
ALTER ROLE postgres SUPERUSER;
```

### Step 3: Setup Backend

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create .env file (already created with default values):
```
PORT=5000
DATABASE_URL=postgresql://postgres:password@localhost:5432/contract_db
NODE_ENV=development
```

4. Initialize database schema:
```bash
node src/config/init-db.js
```

5. Start the backend:
```bash
npm run dev
```

The backend will run on http://localhost:5000

### Step 4: Setup Frontend

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend:
```bash
npm run dev
```

The frontend will run on http://localhost:5173

---

## Database Schema

### Blueprints Table
- `id` (UUID): Primary key
- `name` (VARCHAR): Blueprint name
- `description` (TEXT): Blueprint description
- `terms` (JSONB): Blueprint terms stored as JSON
- `created_at` (TIMESTAMP): Creation timestamp
- `updated_at` (TIMESTAMP): Last update timestamp

### Contracts Table
- `id` (UUID): Primary key
- `blueprint_id` (UUID): Foreign key to blueprints
- `title` (VARCHAR): Contract title
- `status` (VARCHAR): Contract status (e.g., draft, active, completed)
- `created_at` (TIMESTAMP): Creation timestamp
- `updated_at` (TIMESTAMP): Last update timestamp

---

## API Endpoints

### Blueprints
- `POST /api/blueprints` - Create blueprint
- `GET /api/blueprints` - List all blueprints
- `GET /api/blueprints/:id` - Get blueprint by ID
- `PUT /api/blueprints/:id` - Update blueprint
- `DELETE /api/blueprints/:id` - Delete blueprint

### Contracts
- `POST /api/contracts` - Create contract
- `GET /api/contracts` - List all contracts
- `GET /api/contracts/:id` - Get contract by ID
- `PATCH /api/contracts/:id/status` - Update contract status
- `DELETE /api/contracts/:id` - Delete contract

### Health Check
- `GET /api/health` - Server health status

---

## Troubleshooting

### Database Connection Error
- Verify PostgreSQL is running
- Check DATABASE_URL in .env file
- Ensure credentials are correct

### Port Already in Use
- Backend (5000): Change PORT in .env
- Frontend (5173): Vite will use next available port
- PostgreSQL (5432): Change port in docker-compose.yml

### Tables Not Created
- Run: `node src/config/init-db.js`
- Or manually execute: `psql -d contract_db -f backend/src/config/init-db.sql`

---

## Development Commands

### Backend
```bash
cd backend
npm run dev      # Start with nodemon (auto-reload)
npm start        # Start production
```

### Frontend
```bash
cd frontend
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Docker
```bash
docker-compose up -d       # Start all services
docker-compose down        # Stop all services
docker-compose logs -f     # View logs
docker-compose ps          # See running services
```
