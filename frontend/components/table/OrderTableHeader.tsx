import React from 'react';
import { TableHead, TableRow, TableCell, useTheme } from '@mui/material';

const OrderTableHeader: React.FC = () => {
  const theme = useTheme();
  return (
    <TableHead>
      <TableRow sx={{ backgroundColor: theme.palette.grey[50] }}>
        <TableCell sx={{ fontWeight: 600 }}>Customer</TableCell>
        <TableCell sx={{ fontWeight: 600 }}>Dispensary</TableCell>
        <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
        <TableCell sx={{ fontWeight: 600 }}>Delivery Borough</TableCell>
        <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default OrderTableHeader;
