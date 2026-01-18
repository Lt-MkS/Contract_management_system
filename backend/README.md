# Contract Management Backend

Backend API for the Contract Management Platform built with Node.js, Express, and PostgreSQL.

## Features

- Blueprint management (create, read, update, delete)
- Contract management with lifecycle transitions
- RESTful API endpoints
- PostgreSQL database integration
- Error handling and validation
- CORS support

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create .env file:
   ```bash
   cp .env.example .env
   ```

4. Update .env with your database credentials:
   ```
   PORT=5000
   DATABASE_URL=postgresql://postgres:password@localhost:5432/contract_db
   NODE_ENV=development
   ```

5. Initialize database:
   ```bash
   createdb contract_db
   ```

### Running

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Blueprints
- `GET /api/blueprints` - Get all blueprints
- `GET /api/blueprints/:id` - Get blueprint by ID
- `POST /api/blueprints` - Create new blueprint
- `PUT /api/blueprints/:id` - Update blueprint
- `DELETE /api/blueprints/:id` - Delete blueprint

### Contracts
- `GET /api/contracts` - Get all contracts
- `GET /api/contracts/:id` - Get contract by ID
- `POST /api/contracts` - Create new contract
- `PATCH /api/contracts/:id/status` - Update contract status
- `DELETE /api/contracts/:id` - Delete contract

## Technologies

- Express.js
- PostgreSQL
- Node.js
- Nodemon (development)

## License

MIT
