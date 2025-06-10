# SRV'D Multi-Sided Cannabis Ordering System

A full-stack application for managing cannabis delivery orders, featuring an admin dashboard and RESTful API. Built with Next.js, TypeScript, Tailwind CSS, Express, and MongoDB.

---

## Project Structure

```
srvd-test/
├── backend/   # Node.js + Express + MongoDB API
├── frontend/  # Next.js + React + Tailwind CSS admin dashboard
├── LICENSE
└── README.md
```

---

## Tech Stack

### Frontend
- **Next.js**
- **TypeScript**
- **MUI (Material UI)**

### Backend
- **Node.js**
- **Express**
- **TypeScript**
- **MongoDB** (via Mongoose)
- **ESLint & Prettier**

---

## Setup Instructions

### Prerequisites
- Node.js v20+
- npm
- MongoDB (local or Atlas)

### 1. Clone the repository
```sh
git clone <your-repo-url>
cd srvd-test
```

### 2. Backend Setup
```sh
cd backend
cp .env.example .env # Edit .env for your MongoDB URI
npm install
npm run dev # For development
# or
npm run build && npm start # For production
```

### 3. Frontend Setup
```sh
cd ../frontend
npm install
npm run dev
# Visit http://localhost:3000
```

---

## Features
- Admin dashboard to view, filter, and manage delivery orders
- Orders grouped and filtered by borough
- Order status updates and batch optimization
- RESTful API for order CRUD and optimization
- Centralized error handling
- Linting and formatting for code quality

---

## API Overview
- `GET /api/orders` — List all orders (optionally filter by borough)
- `POST /api/orders` — Create a new order
- `PATCH /api/orders/:id/status` — Update order status
- `GET /api/orders/optimize` — Optimize order routes by borough
- `GET /health` — Health check

---

## Contributing
Contributions are welcome! Please open an issue or submit a pull request.

## License
MIT