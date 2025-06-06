"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { getOrders, updateOrderStatus, createOrder, optimizeRoutes } from '../api';
import { Order, OrderStatus, Borough, Batch } from '../types';

interface OrderContextType {
  orders: Order[];
  batches: Batch[];
  loading: boolean;
  error: string | null;
  selectedBorough: Borough | '';
  setSelectedBorough: (borough: Borough | '') => void;
  refreshOrders: () => Promise<void>;
  dispatchOrder: (id: string) => Promise<void>;
  addOrder: (order: Omit<Order, '_id' | 'createdAt' | 'status'>) => Promise<void>;
  optimize: () => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBorough, setSelectedBorough] = useState<Borough | ''>('');

  const refreshOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getOrders(selectedBorough || undefined);
      setOrders(data);
    } catch (err) {
      setError('Error fetching orders');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedBorough]);

  const dispatchOrder = useCallback(async (id: string) => {
    setError(null);
    try {
      await updateOrderStatus(id, OrderStatus.DISPATCHED);
      await refreshOrders();
    } catch (err) {
      setError('Error dispatching order');
      console.error('Error dispatching order:', err);
    }
  }, []);

  const addOrder = useCallback(async (order: Omit<Order, '_id' | 'createdAt' | 'status'>) => {
    setError(null);
    try {
      await createOrder(order);
      await refreshOrders();
    } catch (err) {
      setError('Error creating order');
      console.error('Error creating order:', err);
    }
  }, []);

  const optimize = useCallback(async () => {
    setError(null);
    try {
      const { batches } = await optimizeRoutes();
      setBatches(batches);
    } catch (err) {
      setError('Error optimizing routes');
      console.error('Error optimizing routes:', err);
    }
  }, []);

  useEffect(() => {
    refreshOrders();
  }, [selectedBorough, refreshOrders]);

  const value = useMemo(
    () => ({
      orders,
      batches,
      loading,
      error,
      selectedBorough,
      setSelectedBorough,
      refreshOrders,
      dispatchOrder,
      addOrder,
      optimize,
    }),
    [
      orders,
      batches,
      loading,
      error,
      selectedBorough,
      setSelectedBorough,
      refreshOrders,
      dispatchOrder,
      addOrder,
      optimize,
    ]
  );

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrders must be used within an OrderProvider');
  return ctx;
};