Contract Management Platform

This is a full-stack web application that helps organizations create, manage, and track contracts throughout their entire lifecycle — from drafting to final completion. The system is built to be clean, fast, and practical, focusing on real-world contract workflows rather than just CRUD operations.

What does this project do?

With this platform, a user can:

Create contract blueprints (templates with predefined terms)

Generate contracts from those blueprints

Move contracts through different stages like
Draft → Pending → Active → Completed / Cancelled

Update status in real time without refreshing the page

Manage and delete contracts and templates easily

In short: it simulates how contracts are actually handled in companies.

Tech Stack
Backend

Node.js + Express (REST API)

PostgreSQL (relational database)

Docker (for easy setup and deployment)

Frontend

React + TypeScript

Vite (fast dev server)

Tailwind CSS (modern UI styling)

Axios (API communication)

How to Run the Project
Easiest Way (Docker)
git clone <repo-url>
cd contract-management-platform
docker-compose up -d


Open:

Frontend: http://localhost:5173

Backend: http://localhost:5000/api

Manual Setup (Without Docker)

Create database:

CREATE DATABASE contract_db;


Backend:

cd backend
npm install
npm run init-db
npm run dev


Frontend:

cd frontend
npm install
npm run dev

How the System Works (Flow)

Blueprints
You first define reusable contract templates (NDA, Service Agreement, etc.)

Contracts
You create actual contracts from those templates.

Lifecycle Tracking
Each contract moves through stages like:

Draft

Pending

Active

Completed / Cancelled

Real-time UI
Status changes and updates appear instantly.

Key Features

Clean separation of frontend & backend

UUID-based database design

Foreign key relations with cascade delete

Real-time status updates

RESTful APIs

Proper validation & error handling

Dockerized for easy setup

Why this project is valuable for interviews

This project shows:

End-to-end system design

Real business workflow modeling

REST API design

Database schema design

Frontend-backend integration

Production-ready folder structure

It is not just a demo app — it mirrors how contract systems work in real SaaS products.
