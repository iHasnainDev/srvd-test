import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Borough } from '../types';

interface BoroughFilterProps {
  selectedBorough: Borough | '';
  setSelectedBorough: (borough: Borough | '') => void;
}

const boroughs: Borough[] = [
  'MANHATTAN',
  'BROOKLYN',
  'QUEENS',
  'BRONX',
  'STATEN_ISLAND',
];

const BoroughFilter: React.FC<BoroughFilterProps> = ({ selectedBorough, setSelectedBorough }) => (
  <FormControl size="small" sx={{ minWidth: 180 }}>
    <InputLabel>Borough</InputLabel>
    <Select
      label="Borough"
      value={selectedBorough}
      onChange={e => setSelectedBorough(e.target.value as Borough || '')}
    >
      <MenuItem value="">All Boroughs</MenuItem>
      {boroughs.map(b => (
        <MenuItem key={b} value={b}>{b.replace('_', ' ')}</MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default BoroughFilter;
