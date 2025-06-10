import React from 'react';
import { TableRow, TableCell, Typography } from '@mui/material';

interface EmptyStateProps {
  message?: string;
  colSpan?: number;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  message = 'No data found.',
  colSpan = 5,
}) => (
  <TableRow>
    <TableCell colSpan={colSpan} align="center" sx={{ py: 4 }}>
      <Typography 
        variant="body1" 
        color="text.secondary"
        sx={{ fontStyle: 'italic' }}
      >
        {message}
      </Typography>
    </TableCell>
  </TableRow>
);

export default EmptyState;
