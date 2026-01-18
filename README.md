# Contract Management Platform

A modern full-stack web application for managing contracts and contract blueprints with real-time lifecycle transitions.

## Project Overview

This platform allows users to:
- Create and manage contract blueprints with customizable terms
- Generate contracts from blueprints
- Track contract lifecycle from draft through completion
- Manage contract statuses (draft, pending, active, completed, cancelled)

## Tech Stack

### Backend
- Node.js with Express.js
- PostgreSQL database
- RESTful API
- Docker support

### Frontend
- React 18 with TypeScript
- Vite for fast development
- Tailwind CSS for styling
- Axios for API requests

## Quick Start

### Prerequisites
- Docker and Docker Compose (recommended)
- OR Node.js 18+ and PostgreSQL 14+

### Option 1: Using Docker (Recommended)

```bash
# Clone the repository
cd contract-management-platform

# Start all services
docker-compose up --build

# Access the application
# Frontend: http://localhost:5173
# Backend API: http://localhost:5000/api
```

### Option 2: Manual Setup

#### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run dev
```

#### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

#### Database Setup
```bash
createdb contract_db
```

## Project Structure

```
contract-management-platform/
├── backend/
│   ├── src/
│   │   ├── config/       # Database configuration
│   │   ├── models/       # Data models
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Custom middleware
│   │   └── server.js     # Express server
│   ├── package.json
│   ├── .env.example
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── services/     # API client
│   │   ├── types/        # TypeScript definitions
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── .env.example
│   ├── vite.config.ts
│   └── Dockerfile
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

## API Endpoints

### Blueprints
- `GET /api/blueprints` - List all blueprints
- `GET /api/blueprints/:id` - Get specific blueprint
- `POST /api/blueprints` - Create new blueprint
- `PUT /api/blueprints/:id` - Update blueprint
- `DELETE /api/blueprints/:id` - Delete blueprint

### Contracts
- `GET /api/contracts` - List all contracts
- `GET /api/contracts/:id` - Get specific contract
- `POST /api/contracts` - Create new contract
- `PATCH /api/contracts/:id/status` - Update contract status
- `DELETE /api/contracts/:id` - Delete contract

## Workflow

1. **Create Blueprints**: Define contract templates with terms
2. **Create Contracts**: Generate contracts from blueprints
3. **Manage Lifecycle**: Transition contracts through various statuses
4. **Track Progress**: Monitor contract statuses in real-time

## Database Schema

### Blueprints Table
- `id` - UUID primary key
- `name` - Blueprint name
- `description` - Blueprint description
- `terms` - JSON array of terms

### Contracts Table
- `id` - UUID primary key
- `blueprint_id` - Foreign key to blueprints
- `title` - Contract title
- `status` - Current status (draft, pending, active, completed, cancelled)

## Troubleshooting

### Port Already in Use
- Backend: Change `PORT` in `backend/.env`
- Frontend: Update `server.port` in `frontend/vite.config.ts`

### Database Connection Error
- Ensure PostgreSQL is running
- Verify credentials in `backend/.env`
- Confirm database exists or run `createdb contract_db`

### Module Not Found
Run `npm install` in the respective directory

### CORS Issues
- Verify backend is running on correct port
- Check `VITE_API_BASE_URL` in frontend `.env`

## Development

### Hot Reload
Both frontend and backend support hot reload during development via Vite and Nodemon respectively.

### Building for Production
```bash
cd frontend
npm run build
```

## License

MIT

## Support

For issues or questions, please create an issue in the repository.
