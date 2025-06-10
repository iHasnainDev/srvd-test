# Backend API

A Node.js + TypeScript backend using Express and MongoDB (Mongoose).

## Features
- RESTful API for order management
- MongoDB integration with Mongoose
- Centralized error handling
- Health check endpoint
- Linting and formatting with ESLint & Prettier
- Environment variable support

## Prerequisites
- [Node.js](https://nodejs.org/) (v20+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

## Setup

1. **Clone the repository**
   ```sh
   git clone <your-repo-url>
   cd backend
   ```
2. **Copy and configure environment variables**
   ```sh
   cp .env.example .env
   # Edit .env to set your MongoDB URI and other secrets
   ```
3. **Install dependencies**
   ```sh
   npm install
   ```
4. **Start MongoDB**
   - For local: `mongod` (see [MongoDB installation guide](https://docs.mongodb.com/manual/installation/))
   - For Atlas: ensure your `.env` has the correct `MONGODB_URI`
5. **Run in development mode**
   ```sh
   npm run dev
   ```
6. **Build for production**
   ```sh
   npm run build
   ```
7. **Start production server**
   ```sh
   npm start
   ```

## Environment Variables
- `PORT` - Port to run the server (default: 5000)
- `MONGODB_URI` - MongoDB connection string

## API Endpoints

### Health Check
- `GET /health` — Returns service status, uptime, and timestamp

### Orders
- `GET /api/orders` — List all orders (optionally filter by borough)
- `POST /api/orders` — Create a new order
- `PATCH /api/orders/:id/status` — Update order status
- `GET /api/orders/optimize` — Optimize order routes by borough

## Linting & Formatting
- Lint: `npm run lint`
- Format: `npm run format`

## Project Structure

- `src/models/` — Mongoose models
- `src/controllers/` — Route controllers
- `src/routes/` — Express routes
- `src/config/` — Configuration (DB, etc)
- `src/utils/` — Utility functions
- `src/app.ts` — Express app setup
- `src/server.ts` — App entry point

## License
MIT
