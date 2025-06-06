import React from 'react';
import { Alert, CircularProgress, Button, TableCell, TableRow } from '@mui/material';
import { CheckCircle, LocalShipping, HourglassEmpty, Cancel, DoneAll } from '@mui/icons-material';
import { Order } from '../../types';

interface OrderRowProps {
  order: Order;
  loading: boolean;
  dispatchingId: string | null;
  onDispatch: (id: string) => void;
}

const statusIcon = (status: string) => {
  switch (status) {
    case 'PENDING': return <HourglassEmpty color="warning" fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />;
    case 'DISPATCHED': return <LocalShipping color="info" fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />;
    case 'DELIVERED': return <CheckCircle color="success" fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />;
    case 'CANCELLED': return <Cancel color="error" fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />;
    default: return null;
  }
};

const statusColor = (status: string) => {
  switch (status) {
    case 'PENDING': return 'warning';
    case 'DISPATCHED': return 'info';
    case 'DELIVERED': return 'success';
    case 'CANCELLED': return 'error';
    default: return 'info';
  }
};

const OrderRow: React.FC<OrderRowProps> = ({ order, loading, dispatchingId, onDispatch }) => (
  <TableRow>
    <TableCell>{order.customer}</TableCell>
    <TableCell>{order.dispensary}</TableCell>
    <TableCell>
      <Alert icon={statusIcon(order.status)} severity={statusColor(order.status)} sx={{ p: 0.5, px: 1, fontSize: 13, width: 'fit-content', m: 0, display: 'flex', alignItems: 'center' }}>
        {order.status}
      </Alert>
    </TableCell>
    <TableCell>{order.borough.replace('_', ' ')}</TableCell>
    <TableCell>
      <Button
        variant="contained"
        color="primary"
        size="small"
        disabled={loading || order.status === 'DISPATCHED' || dispatchingId === order._id}
        onClick={() => onDispatch(order._id)}
        startIcon={dispatchingId === order._id ? <CircularProgress size={16} color="inherit" /> : <DoneAll fontSize="small" />}
      >
        Dispatch
      </Button>
    </TableCell>
  </TableRow>
);

export default OrderRow;
