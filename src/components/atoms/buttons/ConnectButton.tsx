'use client';

import { useAppKit, useDisconnect } from '@reown/appkit/react';
import { useAppKitAccount } from '@reown/appkit/react';
import { Button, Box } from '@mui/material';

export default function ConnectButton() {
  const { open } = useAppKit();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAppKitAccount();

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      {!isConnected ? (
        <Button
          onClick={() => open()}
          variant="contained"
          sx={{
            backgroundColor: '#333',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '8px',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#444',
              transform: 'translateY(-1px)',
            },
            transition: 'all 0.2s ease',
          }}
        >
          Connect Wallet
        </Button>
      ) : (
        <>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '8px',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#45a049',
                transform: 'translateY(-1px)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </Button>
          <Button
            onClick={() => disconnect()}
            variant="contained"
            sx={{
              backgroundColor: '#f44336',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '8px',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#d32f2f',
                transform: 'translateY(-1px)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            Disconnect
          </Button>
        </>
      )}
    </Box>
  );
}
