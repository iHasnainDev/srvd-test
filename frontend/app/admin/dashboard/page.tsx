"use client";

import React from "react";
import OrderTable from "../../../components/table/OrderTable";
import OptimizedBatches from "../../../components/OptimizedBatches";

import OrdersByBoroughDisplay from "../../../components/OrdersByBoroughDisplay";
import { useOrders } from "../../../context/OrderContext";
import {
  Box,
  Typography,
  Alert,
  Paper,
  Divider,
  Skeleton,
  useTheme,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Error as ErrorIcon,
} from "@mui/icons-material";

export default function AdminDashboardPage() {
  const theme = useTheme();
  const {
    orders,
    batches,
    loading,
    selectedBorough,
    setSelectedBorough,
    optimize,
    error,
  } = useOrders();

  const [showGrouped, setShowGrouped] = React.useState(false);

  return (
    <Box
      sx={{
        maxWidth: "xl",
        mx: "auto",
        py: 4,
        px: { xs: 2, sm: 3, md: 4 },
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <DashboardIcon fontSize="large" sx={{ color: "#2196f3" }} />
        <Typography variant="h4" component="h1" fontWeight="600">
          Order Management Dashboard
        </Typography>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" icon={<ErrorIcon />} sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      {/* Main Content */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <OrderTable
          orders={orders}
          selectedBorough={selectedBorough}
          setSelectedBorough={setSelectedBorough}
          optimize={optimize}
          loading={loading}
        />
        {/* Show grouped orders by borough below the table for demo */}
        {showGrouped && <OrdersByBoroughDisplay orders={orders} />}
      </Paper>

      {/* Optimized Batches Section */}
      {batches.length > 0 && (
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Typography variant="h6" component="h2" mb={3} fontWeight="500">
            Optimized Delivery Batches
          </Typography>
          <OptimizedBatches batches={batches} />
        </Paper>
      )}
    </Box>
  );
}
