import React from 'react';
import { TableRow, TableCell, Skeleton } from '@mui/material';

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({ rows = 5, columns = 5 }) => (
  <>
    {Array.from({ length: rows }).map((_, rowIdx) => (
      <TableRow key={rowIdx}>
        <TableCell colSpan={columns}>
          <Skeleton variant="text" height={40} />
        </TableCell>
      </TableRow>
    ))}
  </>
);

export default TableSkeleton;
