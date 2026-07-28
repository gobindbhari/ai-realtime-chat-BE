# Backend

A high-performance backend built with **Bun**, **Express**, and **TypeScript** that powers the frontend application. It provides secure authentication with **Better Auth**, real-time communication using **Socket.IO**, AI-powered features, Razorpay payment processing, and MongoDB data persistence.

Designed with a modular architecture, the server exposes REST APIs, WebSocket events, and authentication endpoints while integrating multiple third-party services.

---

# 🚀 Tech Stack

- **Runtime:** Bun
- **Framework:** Express 5
- **Language:** TypeScript
- **Database:** MongoDB
- **ODM:** Mongoose
- **Authentication:** Better Auth
- **Real-time Communication:** Socket.IO
- **AI Providers:**
  - Google Gemini
  - Groq
- **Payments:** Razorpay
- **Security:**
  - Cookies
  - CORS
- **Environment Management:** dotenv

---

# ✨ Features

- 🔐 Better Auth authentication
- 👤 Session-based user authentication
- 🔑 Google OAuth authentication
- 💬 Real-time chat with Socket.IO
- 🤖 AI-powered chat summary generation
- 💳 Razorpay payment integration
- 📦 MongoDB database with Mongoose
- 🔒 Protected API routes
- 🍪 Cookie-based authentication
- ⚡ Bun runtime for high performance
- 🧩 Modular and scalable project structure
- 🌐 REST API endpoints
- 📡 WebSocket communication

---

# 📁 Project Structure

```
src/
├── config/             # Database configuration
├── controllers/        # API controllers
├── lib/                # Auth, AI, Socket, Razorpay utilities
├── middleware/         # Authentication middleware
├── models/             # MongoDB models
├── routes/             # Route definitions (if applicable)
├── index.ts            # Server entry point
```

---

# 🔗 API Overview

## Authentication

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/*` | All | Better Auth endpoints |
| `/api/me` | GET | Get authenticated user session |

---

## AI

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/ai/summary` | GET | Generate AI chat summary (Protected) |

---

## Payments

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/payment/create-order` | POST | Create Razorpay order |
| `/api/payment/verify-payment` | POST | Verify Razorpay payment |

---

## Socket.IO

The backend initializes a Socket.IO server for real-time communication.

Features include:

- Live messaging
- Instant event broadcasting
- User connection management
- Real-time chat updates

---

# ⚙️ Installation

Clone the repository:

```bash
git clone <repository-url>
cd backend
```

Install dependencies using **Bun**:

```bash
bun install
```

---

# 🔐 Environment Variables (Mandatory)

Create a `.env` file in the project root.

> **All of the following variables are required.** The backend depends on these services and will not start or function correctly if any are missing.

```env
PORT="5000"

MONGO_URI="mongodb+srv://xxxxxxxxxx:xxxxxxxxxx@cluster0.ighdjsc.mongodb.net/ai-realtime-chat?appName=Cluster0"

BETTER_AUTH_SECRET="xxxxxxxxxxxxxxxxxxxx"

GOOGLE_CLIENT_ID="xxxxxxxxxx"
GOOGLE_CLIENT_SECRET="xxxxxxxxxxxxxx"

GROQ_API_KEY="xxxxxxxxxxxxxxxx"

RAZORPAY_KEY_ID="xxxxxxxxxx"
RAZORPAY_SECRET="xxxxxxxxxxxxxxxx"

BETTER_AUTH_URL="http://localhost:5000"

FRONTEND_URL="http://localhost:3000"
BACKEND_URL="http://localhost:5000"
```

---

# 📖 Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | Backend server port |
| `MONGO_URI` | MongoDB connection string |
| `BETTER_AUTH_SECRET` | Secret key used by Better Auth |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret |
| `GROQ_API_KEY` | API key for Groq AI |
| `RAZORPAY_KEY_ID` | Razorpay public key |
| `RAZORPAY_SECRET` | Razorpay secret key |
| `BETTER_AUTH_URL` | Backend authentication URL |
| `FRONTEND_URL` | Frontend application URL (used for CORS and authentication) |
| `BACKEND_URL` | Backend base URL |

---

# ▶️ Running the Project

Start the development server with hot reloading:

```bash
bun run dev
```

The backend will be available at:

```
http://localhost:5000
```

---

# 📦 Production

Build the project:

```bash
bun run build
```

Start the production server:

```bash
bun run start
```

---

# 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server with file watching |
| `bun run build` | Compile the TypeScript project |
| `bun run start` | Start the production server |

---

# 🔐 Authentication

Authentication is handled using **Better Auth**.

Features include:

- Session-based authentication
- Secure cookies
- Google OAuth
- Protected API routes
- Server-side session validation

Authentication endpoints are available under:

```
/api/auth/*
```

---

# 🤖 AI Integration

The backend integrates multiple AI providers.

### Google Gemini

Used for AI-powered processing and responses.

### Groq

Used for fast LLM inference and AI generation.

Current AI endpoint:

```
GET /api/ai/summary
```

---

# 💳 Razorpay Integration

Integrated with Razorpay to support secure payment processing.

Features include:

- Order creation
- Payment verification
- Payment record storage
- Secure server-side verification

---

# 💬 Real-Time Communication

Socket.IO powers the application's real-time functionality.

Capabilities include:

- User connections
- Instant messaging
- Live updates
- Event broadcasting

---

# 🗄️ Database

MongoDB is used as the primary database with Mongoose ODM.

Data includes:

- Users
- Authentication sessions
- Messages
- Payments

---

# 🛡️ Security

The backend includes several security features:

- Better Auth
- Cookie-based authentication
- Protected API middleware
- CORS configuration
- Environment variable management

---

# 🔄 Frontend Integration

This backend is designed specifically to serve the Next.js frontend application.

It provides:

- Authentication APIs
- AI endpoints
- Payment APIs
- WebSocket server
- Session management
- Database access

The frontend communicates with this server using REST APIs and Socket.IO.

---