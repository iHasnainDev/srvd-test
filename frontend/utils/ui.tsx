// utils/ui.tsx
import React from 'react';
import { Borough } from '../types';

export const boroughs: Borough[] = [
  'MANHATTAN',
  'BROOKLYN',
  'QUEENS',
  'BRONX',
  'STATEN_ISLAND',
];

export const BoroughSelect: React.FC<{
  value: Borough | '';
  onChange: (borough: Borough | '') => void;
}> = ({ value, onChange }) => (
  <select
    id="borough-select"
    className="border rounded px-9 py-1 text-sm"
    value={value}
    onChange={e => onChange((e.target.value as Borough) || '')}
  >
    <option value="">All Boroughs</option>
    {boroughs.map(b => (
      <option key={b} value={b}>
        {b.replace('_', ' ')}
      </option>
    ))}
  </select>
);