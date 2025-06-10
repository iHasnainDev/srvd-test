'use client';
import React from 'react';
import { groupOrdersByBorough } from '../utils/groupByBorough';
import { Order } from '../types';
import { Box, Typography, Paper, Chip, Divider, useTheme } from '@mui/material';
import { LocationOn as BoroughIcon } from '@mui/icons-material';

interface OrdersByBoroughDisplayProps {
  orders: Order[];
}

const statusColor = (status: string) => {
  switch (status) {
    case 'PENDING': return 'warning';
    case 'DISPATCHED': return 'primary';
    case 'DELIVERED': return 'success';
    case 'CANCELLED': return 'error';
    default: return 'default';
  }
};

const OrdersByBoroughDisplay: React.FC<OrdersByBoroughDisplayProps> = ({ orders }) => {
  const theme = useTheme();
  const grouped = groupOrdersByBorough(orders);

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" component="h2" mb={3} fontWeight={500}>
        Orders by Borough
      </Typography>
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
        gap: 3
      }}>
        {Object.entries(grouped).map(([borough, boroughOrders]) => (
          <Paper 
            key={borough}
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`,
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: theme.shadows[2]
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
             <BoroughIcon sx={{ color: '#2196f3' }} />  
              <Typography variant="subtitle1" fontWeight={600}>
                {borough.replace('_', ' ')}
              </Typography>
              <Chip
                label={`${boroughOrders.length}`}
                size="small"
                sx={{ 
                  ml: 'auto',
                  backgroundColor: "#2196f3", 
                  color: theme.palette.primary.contrastText,
                  fontWeight: 500
                }}
              />
            </Box>
            
            <Divider sx={{ my: 1.5 }} />
            
            <Box component="ul" sx={{ 
              m: 0, 
              p: 0,
              listStyle: 'none',
              '& li': {
                py: 1.5,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: `1px solid ${theme.palette.divider}`,
                '&:last-child': {
                  borderBottom: 'none'
                }
              }
            }}>
              {boroughOrders.slice(0, 5).map(order => (
                <li key={order._id}>
                  <Typography variant="body2" noWrap sx={{ maxWidth: '60%' }}>
                    {order.customer}
                  </Typography>
                  <Chip
                    label={order.status.toLowerCase()}
                    size="small"
                    color={statusColor(order.status)}
                    variant="outlined"
                    sx={{ 
                      fontSize: '0.65rem',
                      height: 22,
                      borderRadius: 1,
                      borderWidth: 1.5,
                      fontWeight: 500
                    }}
                  />
                </li>
              ))}
              {boroughOrders.length > 5 && (
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                  +{boroughOrders.length - 5} more
                </Typography>
              )}
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default OrdersByBoroughDisplay;