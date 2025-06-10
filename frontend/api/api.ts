import axios from "axios";
import { Order, OrderStatus, Borough, Batch } from "../types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message || error.message || "API Error";
    return Promise.reject(new Error(message));
  }
);

/**
 * Fetch orders, optionally filtered by borough
 */
export const getOrders = async (borough?: Borough): Promise<Order[]> => {
  const response = await api.get("/orders", {
    params: borough ? { borough } : {},
  });
  return response.data as Order[];
};

/**
 * Create a new order
 */
export const createOrder = async (
  order: Omit<Order, "_id" | "createdAt" | "status">
): Promise<Order> => {
  const response = await api.post("/orders", order);
  return response.data as Order;
};

/**
 * Update the status of an order
 */
export const updateOrderStatus = async (
  id: string,
  status: OrderStatus
): Promise<void> => {
  await api.patch(`/orders/${id}/status`, { status });
};

/**
 * Get optimized route batches
 */
export const optimizeRoutes = async (): Promise<{ batches: Batch[] }> => {
  const response = await api.get("/orders/optimize");
  return response.data as { batches: Batch[] };
};
