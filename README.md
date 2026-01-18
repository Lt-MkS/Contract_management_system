Contract Management Platform

This is a full-stack web application that helps organizations create, manage, and track contracts throughout their entire lifecycle — from drafting to final completion. The focus is on building a clean, fast, and practical system that reflects real-world contract workflows, not just basic CRUD operations.

What does this project do?

With this platform, a user can:

Create contract blueprints (reusable templates with predefined terms)

Generate contracts from those blueprints

Move contracts through different stages such as:
Draft → Pending → Active → Completed / Cancelled

Update contract status in real time without refreshing the page

Manage and delete both contracts and templates easily

In short, it simulates how contracts are actually handled inside companies and legal teams.

Tech Stack
Backend

Node.js + Express (RESTful API)

PostgreSQL (relational database)

Docker (for easy setup and deployment)

Frontend

React + TypeScript

Vite (fast development server)

Tailwind CSS (modern UI styling)

Axios (API communication)

How to Run the Project
Easiest Way (Using Docker)
git clone <repo-url>
cd contract-management-platform
docker-compose up -d


Open:

Frontend: http://localhost:5173

Backend API: http://localhost:5000/api

Manual Setup (Without Docker)
Create Database
CREATE DATABASE contract_db;

Backend
cd backend
npm install
npm run init-db
npm run dev

Frontend
cd frontend
npm install
npm run dev

How the System Works
1. Blueprints

You first define reusable contract templates such as NDAs or service agreements.

2. Contracts

Actual contracts are generated from these blueprints.

3. Lifecycle Tracking

Each contract moves through stages like:

Draft

Pending

Active

Completed / Cancelled

4. Real-time Interface

Status changes and updates are reflected instantly in the UI.

Key Features

Clean separation between frontend and backend

UUID-based database design

Foreign key relations with cascade delete

Real-time status updates

Well-structured REST APIs

Proper validation and error handling

Fully Dockerized setup
