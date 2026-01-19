# 📄 Contract Management Platform

A full-stack web application designed to help organizations create, manage, and track contracts throughout their entire lifecycle — from creation to final completion or cancellation.

The system is built to be clean, fast, and practical, reflecting real-world legal and business workflows rather than just basic CRUD operations.

---

## 🚀 What Does This Project Do?

This platform allows users to:

- Create **contract blueprints** (reusable templates with predefined terms)
- Generate **contracts** from those blueprints
- Move contracts through real-life stages:
  - Draft
  - Pending
  - Active
  - Completed / Cancelled
- Update contract status in real time (no page refresh)
- Easily manage and delete both contracts and templates

In short, it simulates how contracts are actually handled inside companies and legal teams.

---

## 🧱 Tech Stack

### Backend
- Node.js + Express (RESTful API)
- PostgreSQL (Relational Database)
- Docker (Containerization & Deployment)

### Frontend
- React + TypeScript
- Vite (Fast development server)
- Tailwind CSS (Modern UI styling)
- Axios (API communication)

---

## ⚙️ Setup Instructions

### 🔥 Easiest Way (Using Docker)

```bash
# Clone the repository
git clone <repo-url>
cd contract-management-platform

# Start everything with Docker
docker-compose up -d

# Open in browser:
# Frontend: http://localhost:5173
# Backend API: http://localhost:5000/api
```

### 🛠️ Manual Setup (Without Docker)

#### 1. Create Database
```bash
# Create PostgreSQL database
createdb contract_db
```

#### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Initialize database (creates tables)
npm run init-db

# Start development server (with auto-reload)
npm run dev

# Server will run at http://localhost:5000
```

#### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

---

## 🏗️ Architecture Overview

### System Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│         React Frontend (TypeScript + Vite)              │
│  ├─ Dashboard (contract table view)                    │
│  ├─ Blueprint Management (CRUD forms)                  │
│  ├─ Contract Creation (select blueprint + fill fields) │
│  └─ Lifecycle Actions (state transition buttons)       │
└─────────────────────┬─────────────────────────────────┘
                      │ HTTP REST API
┌─────────────────────▼─────────────────────────────────┐
│       Node.js + Express Backend                        │
│  ├─ /api/blueprints (CRUD)                           │
│  ├─ /api/contracts (CRUD + status transitions)       │
│  ├─ Business Logic Layer (state machine)             │
│  └─ Middleware (validation, error handling)          │
└─────────────────────┬─────────────────────────────────┘
                      │ SQL Queries
┌─────────────────────▼─────────────────────────────────┐
│       PostgreSQL Database                             │
│  ├─ blueprints table                                 │
│  ├─ contracts table                                  │
│  └─ Foreign key relationships                        │
└─────────────────────────────────────────────────────┘
```

### Component Architecture

**Backend Structure:**
```
backend/
├── src/
│   ├── server.js              (Express app)
│   ├── config/
│   │   ├── database.js        (DB connection)
│   │   └── init-db.sql        (schema)
│   ├── models/
│   │   ├── Blueprint.js       (CRUD operations)
│   │   └── Contract.js        (CRUD + lifecycle)
│   ├── routes/
│   │   ├── blueprints.js      (endpoints)
│   │   └── contracts.js       (endpoints)
│   └── middleware/
│       ├── errorHandler.js
│       └── validation.js
```

**Frontend Structure:**
```
frontend/src/
├── components/
│   ├── Dashboard.tsx          (main view)
│   ├── BlueprintForm.tsx      (create/edit)
│   ├── BlueprintList.tsx      (view all)
│   ├── ContractForm.tsx       (create from blueprint)
│   └── ContractActions.tsx    (lifecycle buttons)
├── services/
│   └── api.ts                 (HTTP client)
├── types/
│   └── index.ts               (TypeScript interfaces)
└── App.tsx
```

---

## 📡 API Design Summary

### Blueprint Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/blueprints` | Create blueprint template |
| GET | `/api/blueprints` | List all blueprints |
| GET | `/api/blueprints/:id` | Get specific blueprint |
| PUT | `/api/blueprints/:id` | Update blueprint |
| DELETE | `/api/blueprints/:id` | Delete blueprint |

**Create Blueprint Example:**
```bash
POST /api/blueprints
Content-Type: application/json

{
  "name": "NDA Template",
  "description": "Standard Non-Disclosure Agreement",
  "terms": {
    "duration": "2 years",
    "confidentiality_level": "strict",
    "penalties": "defined"
  }
}
```

**Response (201):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "NDA Template",
  "description": "Standard Non-Disclosure Agreement",
  "terms": {...},
  "created_at": "2024-01-19T10:00:00Z"
}
```

### Contract Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/contracts` | Create contract from blueprint |
| GET | `/api/contracts` | List all contracts |
| GET | `/api/contracts/:id` | Get specific contract |
| PUT | `/api/contracts/:id` | Update contract (status, data) |
| DELETE | `/api/contracts/:id` | Delete contract |

**Create Contract Example:**
```bash
POST /api/contracts
Content-Type: application/json

{
  "blueprint_id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Acme Corp NDA - 2024",
  "status": "draft"
}
```

**Response (201):**
```json
{
  "id": "660e8400-e29b-41d4-a716-446655440111",
  "blueprint_id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Acme Corp NDA - 2024",
  "status": "draft",
  "created_at": "2024-01-19T11:00:00Z"
}
```

**Update Contract Status Example:**
```bash
PUT /api/contracts/660e8400-e29b-41d4-a716-446655440111
Content-Type: application/json

{
  "status": "pending"
}
```

**Valid Status Transitions:**
```
draft → pending → active → completed
  ↓
cancelled
```

---

## 🗄️ Database Schema Design

### PostgreSQL Tables

#### **blueprints table**
Stores reusable contract templates
```sql
CREATE TABLE blueprints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  terms JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Fields:**
- `id` — Unique identifier (UUID)
- `name` — Blueprint template name
- `description` — Template description
- `terms` — JSON object containing template configuration
- `created_at` — Timestamp when created
- `updated_at` — Timestamp of last update

**Example data:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "NDA Template",
  "description": "Standard Non-Disclosure Agreement",
  "terms": {
    "duration": "2 years",
    "confidentiality_level": "strict",
    "penalties": "defined"
  },
  "created_at": "2024-01-19T10:00:00Z",
  "updated_at": "2024-01-19T10:00:00Z"
}
```

#### **contracts table**
Stores contract instances generated from blueprints
```sql
CREATE TABLE contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blueprint_id UUID NOT NULL REFERENCES blueprints(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_contracts_blueprint ON contracts(blueprint_id);
CREATE INDEX idx_contracts_status ON contracts(status);
```

**Fields:**
- `id` — Unique identifier (UUID)
- `blueprint_id` — Foreign key referencing blueprints table
- `title` — Contract instance title
- `status` — Current lifecycle status (draft, pending, active, completed, cancelled)
- `created_at` — Timestamp when created
- `updated_at` — Timestamp of last update

**Example data:**
```json
{
  "id": "660e8400-e29b-41d4-a716-446655440111",
  "blueprint_id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Acme Corp NDA - 2024",
  "status": "pending",
  "created_at": "2024-01-19T11:00:00Z",
  "updated_at": "2024-01-19T11:30:00Z"
}
```

### Relationships
```
blueprints (1) ──── (Many) contracts
  ├─ One blueprint can have multiple contracts
  ├─ ON DELETE CASCADE: deleting blueprint deletes all contracts
  └─ Foreign key ensures data integrity
```

### Data Types Explained
- **UUID** — Universally unique identifier (64-bit, secure, distributed-friendly)
- **VARCHAR(255)** — Text field with max 255 characters (name, title)
- **TEXT** — Unlimited length text (description)
- **JSONB** — Binary JSON format (fast queries, flexible storage)
- **TIMESTAMP** — Date and time with timezone
- **REFERENCES** — Foreign key constraint linking contracts to blueprints

---

## 💡 Assumptions and Trade-offs

### Key Assumptions

1. **Contract Lifecycle is Linear & Sequential**
   - Contracts follow: draft → pending → active → completed
   - Cannot skip states (no draft → active directly)
   - Can be revoked at any point to cancelled
   - Makes workflow predictable and auditable

2. **One Blueprint per Contract**
   - Contract inherits all fields and terms from its blueprint
   - Simplifies data model and relationships
   - Prevents field mixing from multiple templates

3. **Status-Only Updates After Contract Creation**
   - Contract title and blueprint terms cannot change after creation
   - Only status transitions allowed via API
   - Ensures audit trail integrity and prevents data tampering

4. **No User Authentication (MVP)**
   - Currently no login system or user roles
   - All users can see and modify all contracts
   - Can be added later with JWT tokens and role-based access
   - Mocked authentication can be implemented in middleware

5. **JSONB Storage for Flexibility**
   - Terms stored as JSON instead of rigid database columns
   - Different blueprints can have different term structures
   - Makes schema future-proof for evolving requirements

6. **In-Memory Validation Only**
   - No complex approval workflows or multi-step verification
   - Status transitions happen immediately
   - State change logic centralized in backend middleware

### Trade-offs Made

| Trade-off | What We Chose | Why | Alternative |
|-----------|---------------|-----|-------------|
| **Database** | PostgreSQL (Relational SQL) | Strong consistency, JSONB support, good for structured + flexible data | MongoDB (NoSQL) — more flexible but harder to enforce relationships |
| **Primary Keys** | UUID | Secure, distributed-friendly, prevents ID guessing | Auto-increment integers — simpler but less secure |
| **State Management** | Strict sequence enforcement | Prevents invalid transitions, enforced at backend | Free-form status — easier but error-prone |
| **API Style** | REST (HTTP) | Simple, widely understood, standard practices | GraphQL — more powerful but overkill for MVP |
| **Frontend** | React + TypeScript | Type safety catches bugs, component reusability | Plain JavaScript — faster to write but error-prone |
| **Status Validation** | Enum validation on backend | Type-safe, prevents typos | String comparison — flexible but risky |

### Why PostgreSQL + JSONB?

**Advantages:**
- ✅ **Strong Schema Enforcement** — Blueprints and contracts tables have defined structure
- ✅ **Flexible Field Storage** — JSONB allows different blueprint types without migrations
- ✅ **Foreign Key Constraints** — Database enforces data integrity automatically
- ✅ **ACID Transactions** — Guarantees data consistency
- ✅ **Querying** — Can filter, search, and aggregate JSON data efficiently
- ✅ **Full-text Search** — Native support for searching within JSON fields

**Alternatives considered:**
- **MongoDB (NoSQL)** — More flexible schema, but harder to enforce relationships
- **Firebase (NoSQL)** — Fast setup, but limited query capabilities
- **SQLite** — Good for MVP, but not suitable for multi-user production
- **Chose PostgreSQL** because it provides structured + flexible hybrid approach

### Why UUID Instead of Auto-Increment?

- ✅ **Distributed-Friendly** — Can generate IDs without central coordination
- ✅ **Secure** — Attackers can't guess sequential IDs to enumerate data
- ✅ **Privacy** — Users can't infer how many contracts exist by ID values
- ❌ **Trade-off** — Larger storage (16 bytes vs 4-8 bytes for integers)

---

## ✨ Key Features

- ✅ Clean separation of frontend and backend
- ✅ UUID-based database design for security
- ✅ Foreign key relationships with cascade delete
- ✅ Real-time status updates (no page refresh)
- ✅ Well-structured REST APIs
- ✅ Proper validation and error handling
- ✅ Fully Dockerized setup for easy deployment

---

## 🐛 Troubleshooting

**"Cannot connect to database"**
```bash
# Ensure PostgreSQL is running
# Check DATABASE_URL is correct
# Verify database exists
psql postgresql://localhost/contract_db
```

**"Port 5000 already in use"**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

**Frontend shows 404 errors**
- Verify backend is running at correct port
- Check API_BASE_URL in frontend config
- Check browser console for details

---

**Last updated:** January 19, 2026
