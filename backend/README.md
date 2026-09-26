# CodeFlow Backend API

Node.js + Express + MongoDB Atlas REST API for the CodeFlow community platform.

## 🚀 Quick Start

### 1. Setup environment
```bash
cp .env.example .env
# Fill in your MongoDB URI, JWT secret, Gmail credentials
```

### 2. Install dependencies
```bash
npm install
```

### 3. Seed the first admin (optional)
```bash
npm run seed:admin
```

### 4. Start development server
```bash
npm run dev        # with nodemon (auto-restart)
npm start          # production
```

Server runs on **http://localhost:5000**

---

## 📋 API Endpoints

### Health
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | `/api/health` | — | Server health check |

### Auth (Admin)
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/api/auth/register` | — | Register admin |
| POST | `/api/auth/login` | — | Login → get JWT token |
| GET | `/api/auth/me` | 🔒 Admin | Get current admin |

### Members
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/api/members` | — | Join community (public form) |
| GET | `/api/members` | 🔒 Admin | List all members |
| PATCH | `/api/members/:id/status` | 🔒 Admin | Approve / reject member |
| DELETE | `/api/members/:id` | 🔒 Admin | Delete member |

### Events
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | `/api/events` | — | Get all events |
| GET | `/api/events/:id` | — | Get single event |
| POST | `/api/events` | 🔒 Admin | Create event |
| PUT | `/api/events/:id` | 🔒 Admin | Update event |
| DELETE | `/api/events/:id` | 🔒 Admin | Delete event |

### Projects
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | `/api/projects` | — | Get all projects |
| GET | `/api/projects/:id` | — | Get single project |
| POST | `/api/projects` | 🔒 Admin | Create project |
| PUT | `/api/projects/:id` | 🔒 Admin | Update project |
| DELETE | `/api/projects/:id` | 🔒 Admin | Delete project |

### Contact
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/api/contact` | — | Submit contact message |
| GET | `/api/contact` | 🔒 Admin | Get all messages |
| PATCH | `/api/contact/:id/read` | 🔒 Admin | Mark as read |
| DELETE | `/api/contact/:id` | 🔒 Admin | Delete message |

### Stats
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | `/api/stats` | — | Public community stats |
| GET | `/api/stats/admin` | — | Detailed admin dashboard stats |

---

## 🔐 Authentication

All protected routes require a Bearer token in the header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 🌐 MongoDB Atlas Setup

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com)
2. Create a free cluster (M0)
3. Create a database user
4. Whitelist your IP (or 0.0.0.0/0 for dev)
5. Get the connection string → paste in `.env` as `MONGO_URI`

---

## 📧 Gmail Setup (Nodemailer)

1. Enable 2FA on your Gmail account
2. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Generate App Password for "Mail"
4. Set `EMAIL_USER` and `EMAIL_PASS` in `.env`
