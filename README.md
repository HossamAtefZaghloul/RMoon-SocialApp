# Social App – Full Stack (React + Express)

A simple full-stack **social media app** built with:

- **Frontend**: React (Vite)
- **Backend**: Express.js (Node.js + MongoDB)

---

## 📁 Project Structure

social-app/
├── frontend/ # React app (Vite)
├── server/ # Express backend
├── README.md # You're here


## Requirements

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB (Atlas or local)

---

##  Installation

### 1. Clone the Repository

```bash
   Backend Setup (Express)
Location: /server
Install Dependencies
cd server
npm install
Environment Variables
MONGO_URL=your-connection-string
PORT=5000
JWT_SECRET_KEY=SCA_jwt_secret_key
TOKEN_HEADER_KEY=SCA_token_header_key
Run the Server
npm run dev
Backend running at: http://localhost:5000

  Frontend Setup (React + Vite)
Location: /frontend
Install Dependencies
cd ../frontend
npm install
Run the React App
npm run dev
Frontend running at: http://localhost:5173

 Development Setup
Make sure both servers are running in separate terminals:

# Terminal 1
cd server
npm run dev

# Terminal 2
cd frontend
npm run dev

Features
 User Authentication (JWT)

 MongoDB with Mongoose

 Axios API Integration

 Realtime Chat (Socket.IO) – coming soon

 Image Upload – coming soon

 Tech Stack
Layer	Technology
Frontend	React, Vite, Tailwind CSS
Backend	Express.js, Mongoose, JWT
Database	MongoDB Atlas
Auth	JWT + Cookies
Realtime	(Optional) Socket.IO

📄 License
MIT – For educational use only.

Author
Built by Hossam Atef for learning and practice.
