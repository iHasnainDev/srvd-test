"use client";

import React, { useEffect, useState } from "react";
import { useOrders } from "../../../context/OrderContext";
import OrdersByBoroughDisplay from "../../../components/OrdersByBoroughDisplay";
import {
  Box,
  Typography,
  Paper,
  Skeleton,
  Divider,
  Chip,
  useTheme,
} from "@mui/material";
import {
  Map as BoroughMapIcon,
  Inventory as OrdersIcon,
  WarningAmber as WarningIcon,
  HourglassTop as LoadingIcon,
  FilterAlt as FilterIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";

export default function OrdersGroupedPage() {
  const theme = useTheme();
  const { orders, loading, error, refreshOrders } = useOrders();
  const [lastRefreshTime, setLastRefreshTime] = useState("");

  useEffect(() => {
    setLastRefreshTime(new Date().toLocaleTimeString());
  }, []);

  const handleRefresh = () => {
    refreshOrders();
    setLastRefreshTime(new Date().toLocaleTimeString());
  };

  return (
    <Box
      sx={{
        maxWidth: "xl",
        mx: "auto",
        py: 3,
        px: { xs: 2, md: 3 },
        minHeight: "100vh",
        background: "linear-gradient(160deg, #f8faff 0%, #ffffff 100%)",
      }}
    >
      {/* Header with blue gradient */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
          borderRadius: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <BoroughMapIcon fontSize="large" sx={{ color: "#000" }} />
          <Box>
            <Typography variant="h5" fontWeight="600" sx={{ color: "#000" }}>
              Borough Orders Dashboard
            </Typography>
            <Typography variant="body2" sx={{ color: "#000", opacity: 0.8 }}>
              Orders grouped by delivery location
            </Typography>
          </Box>
          <Chip
            icon={
              <RefreshIcon
                fontSize="small"
                sx={{ color: theme.palette.primary.main }}
              />
            }
            label="Live Sync"
            variant="filled"
            onClick={handleRefresh}
            sx={{
              ml: "auto",
              background: "rgba(255,255,255,0.7)",
              color: theme.palette.primary.dark,
              fontWeight: 500,
              cursor: "pointer",
              "&:hover": {
                background: "rgba(255,255,255,0.9)",
              },
            }}
          />
        </Box>
      </Paper>

      {/* Stats Card - Blue Theme */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 2,
          mb: 3,
        }}
      >
        <Paper
          sx={{
            p: 2.5,
            borderRadius: 2,
            background: "linear-gradient(135deg, #1976d2 0%, #2196f3 100%)",

            boxShadow: "0 2px 8px rgba(33, 150, 243, 0.1)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                p: 1.5,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
              }}
            />

            <Box>
              <Typography variant="body2" sx={{ color: "#ffff", opacity: 0.8 }}>
                Total Orders
              </Typography>
              <Typography variant="h4" sx={{ color: "#ffff" }}>
                {loading ? (
                  <Skeleton width={60} />
                ) : (
                  orders.length.toLocaleString()
                )}
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Additional stat card */}
        <Paper
          sx={{
            p: 2.5,
            borderRadius: 2,
            background: "linear-gradient(135deg, #1976d2 0%, #2196f3 100%)",
            // border: `1px solid ${theme.palette.primary.light}`,
            boxShadow: "0 2px 8px rgba(33, 150, 243, 0.1)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                p: 1.5,
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg,rgb(249, 249, 249) 0%, #bbdefb 100%)",
              }}
            />

            <Box>
              <Typography variant="body2" sx={{ color: "#ffff", opacity: 0.8 }}>
                Active Boroughs
              </Typography>
              <Typography variant="h4" sx={{ color: "#ffff" }}>
                {loading ? (
                  <Skeleton width={60} />
                ) : (
                  new Set(orders.map((o) => o.borough)).size
                )}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* Main Content - Blue Accent */}
      <Paper
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: 3,
          boxShadow: "0 4px 12px rgba(33, 150, 243, 0.08)",
          position: "relative",
          minHeight: 400,
          background: "white",
          borderTop: `3px solid #2196f3`,
        }}
      >
        {error && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              background: "#fff8e1",
              p: 2,
              borderRadius: 2,
              mb: 3,
              borderLeft: `4px solid ${theme.palette.warning.main}`,
            }}
          >
            <WarningIcon sx={{ color: theme.palette.warning.dark }} />
            <Typography
              variant="body2"
              sx={{ color: theme.palette.warning.dark }}
            >
              {error}
            </Typography>
          </Box>
        )}

        {loading ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: 300,
              gap: 2,
            }}
          >
            <Box
              sx={{
                p: 2,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
                animation: "pulse 2s infinite",
              }}
            >
              <LoadingIcon
                fontSize="large"
                sx={{ color: theme.palette.primary.main }}
              />
            </Box>
            <Typography
              variant="body1"
              sx={{ color: theme.palette.primary.dark }}
            >
              Organizing borough data...
            </Typography>
          </Box>
        ) : (
          <OrdersByBoroughDisplay orders={orders} />
        )}
      </Paper>

      {/* Subtle Footer */}
      <Typography
        variant="body2"
        sx={{
          mt: 3,
          textAlign: "center",
          color: "#000",
          opacity: 0.7,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <RefreshIcon fontSize="small" />
        Auto-updating • Last sync: {lastRefreshTime || "Loading..."}
      </Typography>
    </Box>
  );
}
