export interface Order {
  _id: string;
  customer: string;
  dispensary: string;
  status: OrderStatus;
  borough: Borough;
  createdAt: string;
}

export enum OrderStatus {
  PENDING = "PENDING",
  DISPATCHED = "DISPATCHED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export type Borough =
  | "MANHATTAN"
  | "BROOKLYN"
  | "QUEENS"
  | "BRONX"
  | "STATEN_ISLAND";

export interface Batch {
  id: string;
  orders: Order[];
  optimizedRoute: string;
}
