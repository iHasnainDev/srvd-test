import React from "react";
import { Order, Borough } from "../../types";
import { useOrders } from "../../context/OrderContext";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  Snackbar,
  Alert,
  Stack,
  useTheme,
  LinearProgress
} from '@mui/material';
import BoroughFilter from '../BoroughFilter';
import OptimizeButton from '../OptimizeButton';
import OrderRow from './OrderRow';
import OrderTableHeader from './OrderTableHeader';
import TableSkeleton from './TableSkeleton';
import EmptyState from './EmptyState';

interface OrderTableProps {
  orders: Order[];
  selectedBorough: Borough | "";
  setSelectedBorough: (borough: Borough | "") => void;
  optimize: () => Promise<void>;
  loading: boolean;
}

const OrderTable: React.FC<OrderTableProps> = ({
  orders,
  selectedBorough,
  setSelectedBorough,
  optimize,
  loading,
}) => {
  const { dispatchOrder } = useOrders();
  const theme = useTheme();
  const [toast, setToast] = React.useState<{open: boolean, message: string, severity: 'success'|'error'}>({open: false, message: '', severity: 'success'});
  const [optimizing, setOptimizing] = React.useState(false);
  const [dispatchingId, setDispatchingId] = React.useState<string | null>(null);

  const handleDispatch = async (id: string) => {
    if (loading) return;
    setDispatchingId(id);
    try {
      await dispatchOrder(id);
      setToast({open: true, message: 'Order dispatched successfully', severity: 'success'});
    } catch (err) {
      setToast({open: true, message: 'Error dispatching order', severity: 'error'});
    } finally {
      setDispatchingId(null);
    }
  };

  const handleOptimize = async () => {
    setOptimizing(true);
    try {
      await optimize();
      setToast({open: true, message: 'Delivery routes optimized', severity: 'success'});
    } catch {
      setToast({open: true, message: 'Error optimizing routes', severity: 'error'});
    } finally {
      setOptimizing(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        spacing={2} 
        alignItems="center" 
        justifyContent="space-between"
        mb={4}
        sx={{
          backgroundColor: theme.palette.background.paper,
          p: 2,
          borderRadius: 1,
          boxShadow: theme.shadows[1]
        }}
      >
        <BoroughFilter 
          selectedBorough={selectedBorough} 
          setSelectedBorough={setSelectedBorough}
        />
        <OptimizeButton 
          onClick={handleOptimize} 
          loading={loading || optimizing}
        />
      </Stack>
      {optimizing && (
        <LinearProgress 
          color="primary" 
          sx={{ mb: 2, height: 4, borderRadius: 2 }} 
        />
      )}
      <Paper 
        elevation={0} 
        sx={{ borderRadius: 2, border: `1px solid ${theme.palette.divider}`, overflow: 'hidden' }}
      >
        <TableContainer>
          <Table size="medium">
            <OrderTableHeader />
            <TableBody>
              {loading && orders.length === 0 ? (
                <TableSkeleton rows={5} columns={5} />
              ) : orders.length === 0 ? (
                <EmptyState message="No orders found matching your criteria" colSpan={5} />
              ) : (
                orders.map((order) => (
                  <OrderRow 
                    key={order._id}
                    order={order} 
                    loading={loading} 
                    dispatchingId={dispatchingId} 
                    onDispatch={handleDispatch} 
                  />
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={() => setToast(t => ({...t, open: false}))}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          severity={toast.severity} 
          sx={{ width: '100%', boxShadow: theme.shadows[3], alignItems: 'center' }}
          variant="filled"
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default OrderTable;
