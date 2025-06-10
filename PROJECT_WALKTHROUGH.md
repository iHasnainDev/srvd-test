# Project Walkthrough: Delivery Admin Dashboard & Routing Logic

## Overview
This project is a full-stack delivery management and route optimization system for dispensary orders. It features a modern admin dashboard, simulated route batching, and a modular codebase for easy extension. The stack includes:
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Frontend:** Next.js (React), TypeScript, Tailwind CSS

---

## Backend Walkthrough (`backend/`)

### 1. Entry Point & Server Setup
- **`src/app.ts`**: Initializes the Express app, applies middleware (JSON parsing, CORS), and mounts routes from `src/routes/orderRoutes.ts`.
- **`src/server.ts`**: Connects to MongoDB using `src/config/db.ts` and starts the Express server. Reads environment variables from `.env`.

### 2. Database Model
- **`src/models/Order.ts`**: Defines the Mongoose schema for an order:
  - `customer`: String (customer name/info)
  - `dispensary`: String (dispensary name/info)
  - `borough`: String (e.g., Brooklyn, Queens)
  - `status`: Enum (`PLACED`, `DISPATCHED`, etc.)
  - `createdAt`: Date (auto-generated)

### 3. Controllers (Business Logic)
- **`src/controllers/orderController.ts`**:
  - `getOrders(req, res)`: Fetches all orders, optionally filtered by borough (via `?borough=...`). Returns orders sorted by `createdAt` (newest first).
  - `updateOrderStatus(req, res)`: Updates the status of an order by ID. Returns the updated order or 404 if not found.
  - `createOrder(req, res)`: Creates a new order with provided customer, dispensary, and borough. Sets status to `PLACED` by default.
  - `optimizeRoutes(req, res)`: Simulates route optimization:
    - Fetches all `PLACED` orders
    - Groups orders by `borough`
    - For each borough with 5+ orders, creates a batch and assigns a fleet (e.g., "Fleet A", "Fleet B", ...)
    - Returns: array of batches (with borough, count, assignment, order IDs) and count of unbatched orders

### 4. Routes
- **`src/routes/orderRoutes.ts`**: Express router mapping endpoints to controller functions:
  - `GET /orders`: List all orders (optionally filter by borough)
  - `POST /orders`: Create a new order
  - `PATCH /orders/:id/status`: Update order status
  - `GET /orders/optimize`: Get optimized route batches

### 5. Utilities & Config
- **`src/utils/asyncHandler.ts`**: Wraps async route handlers to catch errors and pass them to Express error middleware.
- **`src/config/db.ts`**: Handles MongoDB connection using Mongoose.

### 6. Environment & Scripts
- **`.env`**: Set `MONGODB_URI` and other secrets.
- **Scripts**:
  - `npm run dev`: Start backend in development mode (nodemon)
  - `npm start`: Start backend in production

---

## Frontend Walkthrough (`frontend/`)

### 1. API Layer
- **`api/api.ts`**: Centralized Axios client for backend API. Exports:
  - `getOrders(borough?)`: Fetches all or borough-filtered orders
  - `createOrder(order)`: Creates a new order
  - `updateOrderStatus(id, status)`: Updates order status
  - `optimizeRoutes()`: Fetches optimized batches from backend

### 2. TypeScript Types
- **`types/index.ts`**: Defines types/interfaces for `Order`, `OrderStatus`, `Borough`, `Batch`, etc. Used throughout the app for type safety.

### 3. App Pages (Next.js App Router)
- **`app/admin/page.tsx`**: Entry point for admin dashboard (may redirect to `/admin/dashboard`).
- **`app/admin/dashboard/page.tsx`**: Main dashboard UI:
  - Fetches and displays all open orders (status `PLACED`)
  - Integrates filter, table, and batch optimization components
  - Handles loading and empty states
- **`app/admin/orders-grouped/page.tsx`**: (Optional) Displays orders grouped by borough
- **`app/page.tsx`**: Landing page (if present)

### 4. Components
- **Order Table & Display:**
  - `OrderTable.tsx`: Renders a table of orders, each row includes:
    - Customer
    - Dispensary
    - Status
    - Borough
    - Actions (status update)
  - `OrderRow.tsx`: Renders a single order row with actions (status update)
  - `OrderTableHeader.tsx`: Table headers
  - `EmptyState.tsx`, `TableSkeleton.tsx`: UI for loading/empty states
- **Filters & Grouping:**
  - `BoroughFilter.tsx`: Dropdown or buttons for borough selection; updates displayed orders
  - `OrdersByBoroughDisplay.tsx`: Groups and displays orders by borough
- **Batching & Optimization:**
  - `OptimizeButton.tsx`: Button to trigger route optimization (calls `optimizeRoutes`)
  - `OptimizedBatches.tsx`: Displays optimized batches (borough, fleet assignment, order count, order IDs)
- **Layout/UI:**
  - `NavbarHeader.tsx`: Top navigation bar
  - `MuiProvider.tsx`: Material UI provider (if using MUI)

### 5. Context & State Management
- **`context/OrderContext.tsx`**: React context for global order state. Provides functions to fetch, update, and manage orders across components.

### 6. Utilities
- **`utils/groupByBorough.ts`**: Groups orders by borough for display or logic
- **`utils/ui.tsx`**: UI utility functions/components

### 7. Styling
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
  - `globals.css`, `tailwind.config.js`, etc.

### 8. Environment & Scripts
- **`.env.local`**: Set `NEXT_PUBLIC_API_URL` to backend base URL
- **Scripts**:
  - `npm run dev`: Start frontend in development mode
  - `npm run build && npm start`: Build and start in production

---

## Feature Walkthrough (End-to-End)

### 1. Viewing All Open Delivery Orders (Admin Dashboard MVP)
- On `/admin/dashboard`, the app fetches all orders with status `PLACED` using `getOrders()`.
- Orders are displayed in a table with columns:
  - Customer
  - Dispensary
  - Status
  - Borough
  - Actions (status update)
- Loading and empty states are handled with `TableSkeleton.tsx` and `EmptyState.tsx`.

### 2. Filtering by Borough
- `BoroughFilter.tsx` provides a UI to select a borough.
- When a borough is selected, the dashboard fetches and displays only orders from that borough.
- Filtering is handled via API (`getOrders(borough)`) and/or frontend grouping (`groupByBorough.ts`).

### 3. Updating Order Status (PLACED → DISPATCHED)
- Each order row includes an action (button or dropdown) to update status (e.g., `PLACED` → `DISPATCHED`).
- On action, `updateOrderStatus(id, status)` is called, updating the backend and refreshing the UI.
- State is managed via context (`OrderContext.tsx`) or local state.

### 4. Routing Logic: Simulated Grouping and Batch Output
- Admin clicks the optimize button (`OptimizeButton.tsx`).
- Calls `optimizeRoutes()` API, which triggers backend logic to group orders by borough and create batches (if 5+ orders in a borough).
- Backend responds with an array of batches (each with borough, order count, assigned fleet, and order IDs) and the count of unbatched orders.
- `OptimizedBatches.tsx` displays each batch, including:
  - Borough name
  - Number of orders in batch
  - Assigned fleet (e.g., "Fleet A")
  - List of order IDs (or order details)
- UI also shows the number of unbatched orders (if any remain).

---

## How to Run (Development)

### Backend
1. `cd backend`
2. Install dependencies: `npm install`
3. Set up `.env` with `MONGODB_URI` and any other required variables
4. Start server: `npm run dev` (API runs at `http://localhost:5000` by default)

### Frontend
1. `cd frontend`
2. Install dependencies: `npm install`
3. Set up `.env.local` with `NEXT_PUBLIC_API_URL` (e.g., `http://localhost:5000/api`)
4. Start dev server: `npm run dev` (App runs at `http://localhost:3000` by default)

---

## Extending the Project
- Add borough/fleet management UI and backend logic
- Support for custom batch sizes or advanced routing algorithms
- Dashboard enhancements: search, sort, analytics, export
- Authentication/authorization for admin access
- Real-time updates (WebSockets)
- Integration with real delivery routing APIs (e.g., Google Maps, Mapbox)
- Mobile-friendly UI

---

## Summary
This project provides a robust, modular foundation for delivery order management and simulated route optimization. The codebase is organized for easy extension and customization, supporting both MVP and future advanced features. For more details, see the code comments and individual file documentation.
