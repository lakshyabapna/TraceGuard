# 🚀 TraceGuard – Smart API Monitoring System

TraceGuard is a **backend-focused full-stack web application** designed to monitor the health, performance, and reliability of APIs. It allows users to register APIs, track uptime and response time, log failures, and visualize performance metrics through a dashboard.

The project demonstrates real-world backend engineering concepts such as **CRUD operations, background processing, performance monitoring, and system reliability**.

---

## 📌 Problem Statement

Modern applications rely heavily on APIs. API failures or performance degradation can directly impact user experience and business operations. However, continuously monitoring APIs and identifying issues early is often overlooked in small to medium-scale systems.

**TraceGuard solves this problem by providing a simple yet effective API monitoring solution.**

---

## 🎯 Key Features

- User authentication and authorization
- CRUD operations for managing monitored APIs
- Periodic API health checks using background jobs
- Logging of response time, status codes, and failure events
- Performance and uptime analytics via dashboard
- Secure and scalable backend architecture

---

## 🧠 How It Works

1. Users register and log in to the application.
2. Users add APIs they want to monitor (URL, method, interval).
3. A background job periodically sends requests to registered APIs.
4. API response data (status code, response time, success/failure) is logged.
5. The dashboard displays uptime percentage and performance trends.

---

## 🛠️ Technology Stack

### Frontend
- React
- HTML, CSS, JavaScript

### Backend
- Node.js
- Express.js
- RESTful APIs

### Database
- MongoDB

### Background Processing
- Cron jobs for scheduled API health checks

### Deployment
- Frontend: Vercel / Netlify  
- Backend: Render / Railway  

---

## 🗂️ Project Structure

traceguard/
│
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── jobs/
│ ├── middleware/
│ └── server.js
│
├── frontend/
│ ├── components/
│ ├── pages/
│ └── services/
│
└── README.md

---

## 🔄 CRUD Operations Overview

### Monitored APIs
- **Create**: Register a new API to monitor
- **Read**: View API details, status, and logs
- **Update**: Modify API URL or monitoring interval
- **Delete**: Remove an API from monitoring

### Logs
- Automatically created during health checks
- Read-only access via dashboard

---

## 🔐 Authentication

- JWT-based authentication
- Secure API access
- User-specific API monitoring data

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js
- MongoDB
- npm / yarn

### Backend Setup
```bash
cd backend
npm install
npm start
Frontend Setup
cd frontend
npm install
npm start
Create a .env file in the backend directory with:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
📦 Deliverables
Complete source code hosted on GitHub

Well-documented README

Fully functional backend and frontend

Scalable and modular code structure

🚀 Future Enhancements
Email or webhook alerts for API failures

Role-based access control

Advanced analytics and filtering

Retry and threshold-based alerting

Support for authentication headers in monitored APIs

👤 Author
Lakshya Bapna
Backend-focused Full Stack Developer