import '../styles/globals.css';
import { OrderProvider } from '../context/OrderContext';
import React from 'react';
import MuiProvider from '../components/MuiProvider';
import NavbarHeader from '../components/NavbarHeader';

export const metadata = {
  title: 'SRVd Admin',
  description: 'Admin dashboard for SRVd',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MuiProvider>
          <NavbarHeader />
          <OrderProvider>
            {children}
          </OrderProvider>
        </MuiProvider>
      </body>
    </html>
  );
}
