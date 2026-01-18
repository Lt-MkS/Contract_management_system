# Contract Management Platform

A modern full-stack web application for managing contracts and contract blueprints with real-time lifecycle transitions.

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Features](#features)
- [Troubleshooting](#troubleshooting)

## 🎯 Project Overview

This platform allows users to:
- Create and manage contract blueprints with customizable terms
- Generate contracts from blueprints
- Track contract lifecycle from draft through completion
- Manage contract statuses (draft, pending, active, completed, cancelled)
- Real-time updates without page reload

## 🛠️ Tech Stack

### Backend
- **Node.js 18+** with Express.js
- **PostgreSQL 14+** database
- **RESTful API** with CORS
- **Docker** support

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Axios** for API requests
- **Lucide React** for icons

## 🚀 Quick Start

### Option 1: Using Docker (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd contract-management-platform

# Start all services
docker-compose up -d

# Wait for services to start (about 10 seconds)

# Access the application
# Frontend: http://localhost:5173
# Backend API: http://localhost:5000/api
# Health Check: http://localhost:5000/api/health
```

**To stop services:**
```bash
docker-compose down
```

---

### Option 2: Manual Setup (Without Docker)

#### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm

#### Step 1: Create Database
```sql
CREATE DATABASE contract_db;
```

#### Step 2: Setup Backend

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Your .env file already has these settings:
# PORT=5000
# DATABASE_URL=postgresql://postgres:Sahara123@localhost:5432/contract_db
# NODE_ENV=development

# Initialize database schema
npm run init-db

# Start backend
npm run dev
```

Backend runs on: **http://localhost:5000**

#### Step 3: Setup Frontend

```bash
# Navigate to frontend (in a new terminal)
cd frontend

# Install dependencies
npm install

# Start frontend
npm run dev
```

Frontend runs on: **http://localhost:5173**

---

## 📖 Running the Application

### Development Mode (Local)

**Terminal 1 - Backend:**
```powershell
cd backend
npm install
npm run dev
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm install
npm run dev
```

Then open: **http://localhost:5173**

### Production Build

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

---

## 📁 Project Structure

```
contract-management-platform/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js         # PostgreSQL connection pool
│   │   │   ├── init-db.js          # Database schema initialization
│   │   │   └── init-db.sql         # SQL schema definitions
│   │   ├── models/
│   │   │   ├── Blueprint.js        # Blueprint CRUD operations
│   │   │   └── Contract.js         # Contract CRUD operations
│   │   ├── routes/
│   │   │   ├── blueprints.js       # Blueprint API endpoints
│   │   │   └── contracts.js        # Contract API endpoints
│   │   ├── middleware/
│   │   │   ├── errorHandler.js     # Error response handler
│   │   │   └── validation.js       # Request body validation
│   │   └── server.js               # Express app setup
│   ├── package.json
│   ├── .env                        # Environment variables
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.tsx       # Main container & state
│   │   │   ├── BlueprintForm.tsx   # Create blueprints
│   │   │   ├── BlueprintList.tsx   # Display blueprints
│   │   │   ├── ContractForm.tsx    # Create contracts
│   │   │   └── ContractActions.tsx # Status & delete
│   │   ├── services/
│   │   │   └── api.ts              # Axios API client
│   │   ├── types/
│   │   │   └── index.ts            # TypeScript interfaces
│   │   ├── App.tsx                 # Root component
│   │   ├── main.tsx                # Entry point
│   │   └── index.css               # Global styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts              # Vite config
│   ├── tailwind.config.js          # Tailwind config
│   └── Dockerfile
│
├── docker-compose.yml              # Docker orchestration
├── .env                            # Environment config
├── README.md                       # This file
├── SETUP.md                        # Setup guide
└── SETUP_STATUS.md                 # Setup status
```

---

## 🔌 API Endpoints

### Blueprints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/blueprints` | Create new blueprint |
| GET | `/api/blueprints` | Get all blueprints |
| GET | `/api/blueprints/:id` | Get blueprint by ID |
| PUT | `/api/blueprints/:id` | Update blueprint |
| DELETE | `/api/blueprints/:id` | Delete blueprint |

**Create Blueprint Example:**
```json
POST /api/blueprints
{
  "name": "NDA Agreement",
  "description": "Non-Disclosure Agreement template",
  "terms": ["Confidentiality", "Term Duration", "Penalties"]
}
```

### Contracts

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contracts` | Create new contract |
| GET | `/api/contracts` | Get all contracts |
| GET | `/api/contracts/:id` | Get contract by ID |
| PATCH | `/api/contracts/:id/status` | Update contract status |
| DELETE | `/api/contracts/:id` | Delete contract |

**Create Contract Example:**
```json
POST /api/contracts
{
  "blueprintId": "uuid-here",
  "title": "NDA with Company X",
  "status": "draft"
}
```

**Update Status Example:**
```json
PATCH /api/contracts/{id}/status
{
  "status": "pending"
}
```

### Health Check

```
GET /api/health
```

Response: `{ "status": "OK", "database": "connected" }`

---

## 🗄️ Database Schema

### Blueprints Table
```sql
CREATE TABLE blueprints (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  terms JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_blueprints_created_at ON blueprints(created_at);
```

### Contracts Table
```sql
CREATE TABLE contracts (
  id UUID PRIMARY KEY,
  blueprint_id UUID NOT NULL REFERENCES blueprints(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_contracts_blueprint_id ON contracts(blueprint_id);
CREATE INDEX idx_contracts_status ON contracts(status);
```

**Data Types:**
- `id`: UUID (unique identifier)
- `status`: 'draft' | 'pending' | 'active' | 'completed' | 'cancelled'
- `terms`: JSONB (JSON array stored in PostgreSQL)

---

## ✨ Features

### Blueprint Management
✅ Create blueprints with name, description, and terms  
✅ View all blueprints with term count  
✅ Update blueprint details  
✅ Delete blueprints (cascades to contracts)  

### Contract Management
✅ Create contracts from blueprints  
✅ Track lifecycle: draft → pending → active → completed/cancelled  
✅ Update contract status in real-time  
✅ Delete contracts  
✅ View all contracts with status badges  

### Real-time Features
✅ Auto-populate blueprints in contract form  
✅ Instant updates without page reload  
✅ Error notifications  
✅ Loading states  

### Data Integrity
✅ UUID primary keys  
✅ Foreign key constraints  
✅ Cascade delete  
✅ Timestamp tracking (created_at, updated_at)  
✅ Database indexes for performance  

---

## 🔐 Validation

**Blueprint Validation:**
- `name`: Required, must be string
- `description`: Required, must be string
- `terms`: Required, must be array

**Contract Validation:**
- `blueprintId`: Required, must exist in blueprints table
- `title`: Required, must be string
- `status`: Required, must be valid status

---

## 🐛 Troubleshooting

### Database Connection Issues

**Problem:** `Password authentication failed`

**Solution:**
```powershell
# Test the password
$env:PGPASSWORD='Sahara123'; & "C:\Program Files\PostgreSQL\18\bin\psql" -U postgres -h localhost -c "SELECT version();"
```

### Port Already in Use

**Problem:** Port 5000 or 5173 already in use

**Solution:**
```bash
# Change port in .env or vite.config.ts
# For backend: Update PORT in .env
# For frontend: Update port in vite.config.ts
```

### Docker Issues

**Problem:** Services not starting

**Solution:**
```bash
# Clean up containers and restart
docker-compose down --volumes
docker-compose up -d --build
```

### Frontend Not Connecting to Backend

**Problem:** API calls failing

**Solution:** Ensure backend is running and check:
```bash
# Check backend health
curl http://localhost:5000/api/health
```

If using Docker, ensure both services are on the same network (handled by docker-compose).

### Database Not Initialized

**Problem:** Tables don't exist

**Solution:**
```bash
cd backend
npm run init-db
```

---

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
DATABASE_URL=postgresql://postgres:Sahara123@localhost:5432/contract_db
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 📦 Dependencies

### Backend
- express: Web framework
- pg: PostgreSQL driver
- cors: Cross-origin requests
- body-parser: JSON parsing
- uuid: ID generation
- dotenv: Environment variables
- nodemon: Dev auto-reload

### Frontend
- react: UI library
- react-dom: React DOM
- axios: HTTP client
- lucide-react: Icons
- typescript: Type safety
- vite: Build tool
- tailwindcss: Styling

---

## 🎓 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite Guide](https://vitejs.dev/)

---

## 📄 License

MIT License - feel free to use this project for learning and development.

---

## 🤝 Support

For issues or questions, please check the [SETUP.md](SETUP.md) and [SETUP_STATUS.md](SETUP_STATUS.md) files.

---

**Last Updated:** January 19, 2026  
**Status:** Production Ready ✓
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
