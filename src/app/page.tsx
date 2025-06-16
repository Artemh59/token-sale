'use client';

import {
  Box,
  Container,
} from '@mui/material';
import ConnectButton from '@/components/atoms/buttons/ConnectButton';
import BuyForm from '@/components/organisms/forms/BuyForm';

export default function App() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          py: 4,
          minHeight: '100vh',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            width: '100%',
          }}
        >
          <ConnectButton />
        </Box>
        <BuyForm />
      </Box>
    </Container>
  );
}
