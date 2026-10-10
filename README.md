# FLOWLEDGER - End-to-End Business Workflow & Approval Platform

## Overview
FlowLedger is a comprehensive business workflow and approval platform designed to manage and automate organizational requests.

## Technology Stack
- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Database**: MongoDB + Mongoose

## Project Structure
- `/frontend` - React application
- `/backend` - Express REST API
- `/docs` - Project documentation

## Installation

### Prerequisites
- Node.js (v22+)
- MongoDB running locally on port 27017 (or use a remote cluster and set `MONGO_URI`).

### Backend Setup
1. `cd backend`
2. `npm install`
3. Create a `.env` file (Optional: define `PORT`, `MONGO_URI`, `JWT_SECRET`).
4. `npm run seed` to insert demo data (users, workflows, etc.).
5. `npm run dev` to start the backend server.

### Frontend Setup
1. `cd frontend`
2. `npm install`
3. `npm run dev` to start the frontend server.

## Demo Credentials
After running the seed script, you can log in with:
- **Employee**: employee@flowledger.com / password
- **Manager**: manager@flowledger.com / password
- **Finance**: finance@flowledger.com / password
- **Department Head**: head@flowledger.com / password
- **Admin**: admin@flowledger.com / password
