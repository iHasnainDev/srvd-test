import Order, { OrderStatus } from '../models/Order';
import { Request, Response } from 'express';

export const getOrders = async (req: Request, res: Response) => {
  try {
    const { borough } = req.query;
    const filter: any = {};
    if (borough) filter.borough = borough;
    const orders = await Order.find(filter).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { customer, dispensary, borough } = req.body;
    const order = new Order({ customer, dispensary, borough });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const optimizeRoutes = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ status: OrderStatus.PLACED });
    const boroughGroups: Record<string, any[]> = {};
    orders.forEach(order => {
      if (!boroughGroups[order.borough]) boroughGroups[order.borough] = [];
      boroughGroups[order.borough].push(order);
    });
    const batches: { borough: string; count: number; assignment: string; orders: any[] }[] = [];
    for (const [borough, boroughOrders] of Object.entries(boroughGroups)) {
      if (boroughOrders.length >= 5) {
        batches.push({
          borough,
          count: boroughOrders.length,
          assignment: `Fleet ${String.fromCharCode(65 + batches.length)}`,
          orders: boroughOrders.map(o => o._id)
        });
      }
    }
    res.json({ batches, unbatchedOrders: orders.length - batches.reduce((sum, b) => sum + b.count, 0) });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
