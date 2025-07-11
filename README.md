
# 📝 Full-Stack Note-Taking App

A full-stack note-taking application built with **React (TypeScript)** on the frontend and **Node.js (Express + TypeScript)** on the backend. Users can sign up with **Email & OTP** or **Google OAuth**, create and delete personal notes, and stay logged in with **JWT authentication**.

---

## 🚀 Features

- ✉️ Signup with Email and OTP
- 🔐 Secure Google OAuth login
- 🧾 Create, view, and delete notes
- ✅ JWT-based authentication
- 🔒 Auth-protected API endpoints
- 🎨 Clean, mobile-responsive UI
- ☁️ Ready for deployment

---

## 🛠️ Tech Stack

| Layer         | Tech                     |
| ------------- | ------------------------ |
| Frontend      | React + TypeScript + TailwindCSS |
| Backend       | Node.js + Express + TypeScript |
| Auth          | Google OAuth + OTP-based JWT |
| Database      | MongoDB (Mongoose ORM)   |
| Version Control | Git                    |

---

## 🧑‍💻 Getting Started

### 📦 Prerequisites

- Node.js `v18+`
- MongoDB (local or Atlas)
- Google Cloud Project (for OAuth)
- Vite (comes with dev setup)

---

## 📁 Folder Structure

note-taking-app/
├── client/ # Frontend
│ └── src/
│ └── pages/
├── server/ # Backend
│ └── src/
│ ├── routes/
│ ├── auth/
│ ├── models/
│ ├── middleware/
│ └── utils/



---

## ⚙️ Setup

### 🔧 Backend (server)

```bash
cd server
npm install


FOR STARTING THE SERVER
npm run dev



cd client
npm install
npm run dev

