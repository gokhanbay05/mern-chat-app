# Real-Time Chat App 💬

A full-stack real-time messaging application built with the **MERN Stack** (MongoDB, Express, React, Node.js) and **Socket.io**.

## 🚀 Tech Stack

- **Frontend:** React, Zustand (State Management)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Real-time:** Socket.io
- **Authentication:** JWT

## ✨ Features

- 🔐 **Secure Authentication:** Signup, Login, and Logout with JWT.
- ⚡ **Real-time Messaging:** Instant delivery using Socket.io.
- 🟢 **Online Status:** See who is currently online.
- 💾 **Persistent State:** State management with Zustand.

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/gokhanbay05/mern-chat-app.git](https://github.com/gokhanbay05/mern-chat-app.git)

2. **Install Dependencies:**

   **Backend**
   - cd backend
   - npm install
   -   Environment Variables: Create a .env file in the directory and add the following:
       - PORT=5000
       - MONGO_URI=your_mongodb_connection_string
       - JWT_SECRET=your_secret_key
       - NODE_ENV=development
       - FRONTEND_ORIGIN=http://localhost:5173
   - npm start
   
   **Frontend**
   - cd frontend
   - npm install
   -   Environment Variables: Create a .env file in the directory and add the following:
       - VITE_API_URL=http://localhost:5000
   - npm run dev





















   
