import React from 'react';
import { Button, CircularProgress } from '@mui/material';

interface OptimizeButtonProps {
  onClick: () => void;
  loading: boolean;
}

const OptimizeButton: React.FC<OptimizeButtonProps> = ({ onClick, loading }) => (
  <Button
    variant="contained"
    color="primary"
    onClick={onClick}
    disabled={loading}
    startIcon={loading ? <CircularProgress size={18} color="inherit" /> : undefined}
    sx={{ minWidth: 160, }}
  >
    Optimize Routes
  </Button>
);

export default OptimizeButton;
