'use client';
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavbarHeader: React.FC = () => {
  const pathname = usePathname();
  return (
    <AppBar 
      position="static"
      elevation={0}
      sx={{ 
        background: 'linear-gradient(90deg, #1976d2 0%, #2196f3 100%)',
        mb: 3
      }}
    >
      <Toolbar sx={{ 
        display: 'flex',
        justifyContent: 'space-between',
        px: 3,
        minHeight: 72
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2
            }}
          >
            <Typography variant="h5" sx={{ color: 'white', fontWeight: 700, letterSpacing: 1 }}>
              S
            </Typography>
          </Box>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700,
              color: 'white',
              letterSpacing: 1.5,
              fontSize: '1.35rem',
              textShadow: '0 2px 8px rgba(25, 118, 210, 0.15)'
            }}
          >
            Dashbaord
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button 
            variant={pathname === '/admin/dashboard' ? 'contained' : 'text'}
            component={Link}
            href="/admin/dashboard"
            sx={{
              textTransform: 'none',
              color: pathname === '/admin/dashboard' ? 'black' : 'white',
              fontWeight: 500,
              fontSize: '1rem',
              px: 2.5,
              borderRadius: 2,
              boxShadow: pathname === '/admin/dashboard' ? 2 : 0,
              backgroundColor: pathname === '/admin/dashboard' ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
              transition: 'all 0.2s',
              '&:hover': {
                backgroundColor: pathname === '/admin/dashboard' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255,255,255,0.12)'
              }
            }}
          >
            Order
          </Button>
          <Button 
            variant={pathname === '/admin/orders-grouped' ? 'contained' : 'text'}
            component={Link}
            href="/admin/orders-grouped"
            sx={{
              textTransform: 'none',
              color: pathname === '/admin/orders-grouped' ? 'black' : 'white',
              fontWeight: 500,
              fontSize: '1rem',
              px: 2.5,
              borderRadius: 2,
              boxShadow: pathname === '/admin/orders-grouped' ? 2 : 0,
              backgroundColor: pathname === '/admin/orders-grouped' ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
              transition: 'all 0.2s',
              '&:hover': {
                backgroundColor: pathname === '/admin/orders-grouped' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255,255,255,0.12)'
              }
            }}
          >
            Group
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarHeader;