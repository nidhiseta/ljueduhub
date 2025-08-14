# LJUEduHub (Fullstack MERN)

This repository contains a Vite + React frontend and Node/Express backend for the LJUEduHub project.

Features:
- Admin hardcoded login (admin / admin123) with JWT-protected admin routes
- Student registration/login (JWT)
- Notes upload (simulated file storage) and metadata saved in MongoDB
- Student view with simulated download and AI summary endpoint (simulated)
- In-browser HTML/CSS editor with live preview and localStorage persistence
- Activity tracking collection for admin analytics

How to run:
1. Start MongoDB (local or Atlas).
2. Backend: cd backend && npm install && cp .env.example .env && edit .env && npm run dev
3. Frontend: cd frontend && npm install && create .env with VITE_API_URL && npm run dev

To push to GitHub:
1. git init
2. git add .
3. git commit -m "Initial commit - LJUEduHub"
4. Create a repo on GitHub and follow instructions to push.

