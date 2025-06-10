import React from 'react';
import { Batch } from '../types';

interface OptimizedBatchesProps {
  batches: Batch[];
  getFleetLabel?: (idx: number) => string;
}

const OptimizedBatches: React.FC<OptimizedBatchesProps> = ({ batches, getFleetLabel }) => {
  return (
    <div className="bg-gray-50 border rounded p-4">
      <h3 className="font-semibold mb-2">Optimized Batches</h3>
      <ul className="space-y-2">
        {batches.map((batch, idx) => (
          <li key={batch.id} className="flex flex-col md:flex-row md:items-center md:gap-4 border-b last:border-b-0 pb-2">
            <span className="font-medium">{batch.orders[0]?.borough || 'Unknown Borough'}</span>
            <span>{batch.orders.length} order{batch.orders.length !== 1 ? 's' : ''}</span>
            <span className="text-sm text-gray-500">{getFleetLabel ? getFleetLabel(idx) : `Fleet ${String.fromCharCode(65 + idx)}`}</span>
            <span className="text-xs text-gray-400">Route: {batch.optimizedRoute}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OptimizedBatches;
