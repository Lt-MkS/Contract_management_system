# 📄 Contract Management Platform

A full-stack web application designed to help organizations create, manage, and track contracts throughout their entire lifecycle — from drafting to final completion.  
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

## ⚙️ How to Run the Project

### 🔥 Easiest Way (Using Docker)

```bash
git clone <repo-url>
cd contract-management-platform
docker-compose up -d
Open in browser:

Frontend: http://localhost:5173

Backend API: http://localhost:5000/api

🛠 Manual Setup (Without Docker)
1. Create Database
sql
Copy code
CREATE DATABASE contract_db;
2. Backend Setup
bash
Copy code
cd backend
npm install
npm run init-db
npm run dev
3. Frontend Setup
bash
Copy code
cd frontend
npm install
npm run dev
🔄 How the System Works
1. Blueprints
Reusable templates such as NDAs, service agreements, etc.

2. Contracts
Actual contracts generated from these blueprints.

3. Lifecycle Tracking
Each contract moves through:

Draft

Pending

Active

Completed / Cancelled

4. Real-Time Interface
All updates are reflected instantly in the UI.

✨ Key Features
Clean separation of frontend and backend

UUID-based database design

Foreign key relationships with cascade delete

Real-time status updates

Well-structured REST APIs

Proper validation and error handling

Fully Dockerized setup for easy deployment
