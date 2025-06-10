// utils/groupByBorough.ts
import { Order, Borough } from '../types';

export type OrdersByBorough = Record<Borough, Order[]>;

/**
 * Groups an array of orders by their borough.
 * @param orders Array of orders
 * @returns Object with boroughs as keys and arrays of orders as values
 */
export function groupOrdersByBorough(orders: Order[]): OrdersByBorough {
  return orders.reduce((acc, order) => {
    if (!acc[order.borough]) {
      acc[order.borough] = [];
    }
    acc[order.borough].push(order);
    return acc;
  }, {
    MANHATTAN: [],
    BROOKLYN: [],
    QUEENS: [],
    BRONX: [],
    STATEN_ISLAND: []
  } as OrdersByBorough);
}
