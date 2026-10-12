# FLOWLEDGER - End-to-End Business Workflow & Approval Platform

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/Harish-Raja-R/flowledger)

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

---

## Production Deployment

### Option 1: Docker (Single-Command Local or VPS)
Run the complete stack (App + MongoDB) with Docker Compose:
```bash
docker compose up --build -d
```
The application will be live at `http://localhost:5000`.

### Option 2: Render (Free Cloud Web Service)
1. Push repository to GitHub.
2. Go to [Render Dashboard](https://dashboard.render.com/) -> **New** -> **Blueprint**.
3. Connect repository `Harish-Raja-R/flowledger`. Render will automatically pick up `render.yaml`.
4. Set your `MONGO_URI` environment variable (e.g., from [MongoDB Atlas](https://www.mongodb.com/atlas)).
5. Click **Apply**. Render will automatically build the React frontend and deploy the Express server.

### Option 3: Split Deployment (Vercel + Render)
- **Frontend (Vercel)**:
  - Root directory: `frontend`
  - Build command: `npm run build`
  - Output directory: `dist`
  - Environment variable: `VITE_API_URL=https://your-backend-api.onrender.com/api`
- **Backend (Render / Railway)**:
  - Root directory: `backend`
  - Build command: `npm install`
  - Start command: `node src/server.js`
  - Environment variables: `PORT=5000`, `NODE_ENV=production`, `MONGO_URI=<Atlas-URI>`, `JWT_SECRET=<secret>`
