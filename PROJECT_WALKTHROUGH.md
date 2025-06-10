# Project Walkthrough: Delivery Admin Dashboard & Routing Logic

## Overview
This project is a full-stack delivery management system designed for dispensary order routing and admin control. It features:
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Frontend:** Next.js (React), TypeScript, Tailwind CSS
- **Key Features:**
  - Admin dashboard to view, filter, and update delivery orders
  - Simulated route optimization: groups orders by borough and assigns batches to fleets
  - Modular, extensible codebase for future enhancements

---

## Backend Structure (`backend/`)

### Entry Point
- **`src/app.ts`**: Configures Express app, middleware, and routes.
- **`src/server.ts`**: Connects to MongoDB and starts the Express server.

### Models
- **`src/models/Order.ts`**: Mongoose schema for orders. Fields include:
  - `customer`: Customer name/info
  - `dispensary`: Dispensary name/info
  - `borough`: Delivery borough (e.g., Brooklyn, Queens)
  - `status`: Order status (`PLACED`, `DISPATCHED`, etc.)
  - `createdAt`: Timestamp

### Controllers
- **`src/controllers/orderController.ts`**:
  - `getOrders(req, res)`: Returns all orders, optionally filtered by borough (via query param). Sorted by creation date.
  - `updateOrderStatus(req, res)`: Updates the status of a specific order by ID.
  - `createOrder(req, res)`: Creates a new order with customer, dispensary, and borough.
  - `optimizeRoutes(req, res)`: Core routing logic:
    - Fetches all `PLACED` orders
    - Groups orders by `borough`
    - For each borough with 5+ orders, creates a batch and assigns a fleet (e.g., "Fleet A")
    - Returns: array of batches (borough, count, assignment, order IDs), and count of unbatched orders

### Routes
- **`src/routes/orderRoutes.ts`**: Express router mapping endpoints to controller functions:
  - `GET /orders`: List orders (optionally filter by borough)
  - `POST /orders`: Create new order
  - `PATCH /orders/:id/status`: Update order status
  - `GET /orders/optimize`: Get optimized route batches

### Utils
- **`src/utils/asyncHandler.ts`**: Wrapper for async route handlers to catch errors.

### Config
- **`src/config/db.ts`**: MongoDB connection logic (URI from environment variables).

### Environment
- `.env`: Set `MONGODB_URI` and other secrets.

### Scripts
- `npm run dev`: Start backend in development mode (nodemon)
- `npm start`: Start backend in production

---

## Frontend Structure (`frontend/`)

### API Layer
- **`api/api.ts`**: Axios client for backend API. Exports functions:
  - `getOrders(borough?)`: Fetch all or borough-filtered orders
  - `createOrder(order)`: Create a new order
  - `updateOrderStatus(id, status)`: Update order status
  - `optimizeRoutes()`: Fetch optimized batches from backend

### Types
- **`types/index.ts`**: TypeScript types/interfaces:
  - `Order`, `OrderStatus`, `Borough`, `Batch`, etc.

### Pages (Next.js App Router)
- **`app/admin/page.tsx`**: Admin dashboard entry point (may redirect to dashboard)
- **`app/admin/dashboard/page.tsx`**: Main dashboard UI:
  - Fetches and displays all open orders
  - Integrates filter, table, and batch optimization components
- **`app/admin/orders-grouped/page.tsx`**: (Optional) Orders grouped by borough
- **`app/page.tsx`**: Landing page (if present)

### Components
- **Order Table & Display:**
  - `OrderTable.tsx`, `OrderRow.tsx`, `OrderTableHeader.tsx`: Table UI for orders
  - `EmptyState.tsx`, `TableSkeleton.tsx`: Loading/empty states
- **Filters & Grouping:**
  - `BoroughFilter.tsx`: Dropdown/filter for borough selection
  - `OrdersByBoroughDisplay.tsx`: Shows orders grouped by borough
- **Batching & Optimization:**
  - `OptimizeButton.tsx`: Button to trigger route optimization
  - `OptimizedBatches.tsx`: Displays optimized batches (borough, fleet, order count, order IDs)
- **Layout/UI:**
  - `NavbarHeader.tsx`: Top navigation bar
  - `MuiProvider.tsx`: Material UI provider (if using MUI)

### Context
- **`context/OrderContext.tsx`**: React context for global order state (fetching, updating, etc.)

### Utils
- **`utils/groupByBorough.ts`**: Helper to group orders by borough (frontend logic)
- **`utils/ui.tsx`**: UI utility functions/components

### Styling
- **Tailwind CSS**: Utility-first CSS framework
  - `globals.css`, `tailwind.config.js`, etc.

### Environment
- `.env.local`: Set `NEXT_PUBLIC_API_URL` to backend base URL

### Scripts
- `npm run dev`: Start frontend in development mode
- `npm run build && npm start`: Build and start in production

---

## Key Features & Flow (Step-by-Step)

### 1. View All Open Delivery Orders
- Admin dashboard fetches all orders with status `PLACED` via `getOrders()`
- Orders are displayed in a table with columns:
  - Customer, Dispensary, Status, Borough, Actions
- Table supports loading and empty states

### 2. Filter by Borough
- `BoroughFilter.tsx` provides a dropdown or buttons for borough selection
- Selecting a borough filters the orders shown in the table (calls `getOrders(borough)`)

### 3. Update Order Status
- Each order row includes an action (button/dropdown) to update status (e.g., `PLACED` → `DISPATCHED`)
- Triggers `updateOrderStatus(id, status)` API call
- UI updates order status in real-time (via context or local state)

### 4. Route Optimization (Batching)
- Admin clicks the optimize button (`OptimizeButton.tsx`)
- Calls `optimizeRoutes()` API
- Backend groups all `PLACED` orders by borough
- For each borough with 5+ orders, creates a batch and assigns a fleet ("Fleet A", "Fleet B", ...)
- `OptimizedBatches.tsx` displays each batch:
  - Borough name
  - Number of orders in batch
  - Assigned fleet
  - List of order IDs (or details)
- Also shows count of unbatched orders (if any)

---

## How to Run (Development)

### 1. Backend
- `cd backend`
- Install dependencies: `npm install`
- Set up `.env` with `MONGODB_URI` and any other required variables
- Start server: `npm run dev`
- API runs at `http://localhost:5000` (default)

### 2. Frontend
- `cd frontend`
- Install dependencies: `npm install`
- Set up `.env.local` with `NEXT_PUBLIC_API_URL` (e.g., `http://localhost:5000/api`)
- Start dev server: `npm run dev`
- App runs at `http://localhost:3000` (default)

---

## Extending the Project (Suggestions)
- Add borough/fleet management UI and backend logic
- Support for custom batch sizes or advanced routing algorithms
- Dashboard enhancements: search, sort, analytics, export
- Authentication/authorization for admin access
- Real-time updates (WebSockets)
- Integration with real delivery routing APIs (e.g., Google Maps, Mapbox)
- Mobile-friendly UI

---

## Summary
This project provides a robust, modular foundation for delivery order management and simulated route optimization. The codebase is organized for easy extension and customization, supporting both MVP and future advanced features.
