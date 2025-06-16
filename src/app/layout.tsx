import './globals.css';
import { AppKitProvider } from '@/components/Providers/AppKitProvider';
import React from 'react';
import { Toaster } from 'sonner';

export const metadata = {
  title: 'Reown App',
  description: 'Connect wallet demo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-right" richColors />
        <AppKitProvider>{children}</AppKitProvider>
      </body>
    </html>
  );
}
