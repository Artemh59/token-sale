import './globals.css';
import { AppKitProvider } from '@/components/Providers/AppKitProvider';
import React from 'react';

export const metadata = {
  title: 'Reown App',
  description: 'Connect wallet demo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppKitProvider>{children}</AppKitProvider>
      </body>
    </html>
  );
}
