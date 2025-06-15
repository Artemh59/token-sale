import {
  Paper,
  Select,
  Input,
  MenuItem,
  Button,
  Box,
  Typography,
  InputAdornment,
  Fade,
} from '@mui/material';
import { useAppKitAccount } from '@reown/appkit/react';

export default function BuyForm() {
  const { isConnected } = useAppKitAccount();

  return (
    <Fade in={true} timeout={800}>
      <Paper
        elevation={0}
        sx={{
          bgcolor: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: 4,
          border: '1px solid rgba(255, 255, 255, 0.1)',
          p: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            fontWeight: 600,
            color: 'white',
            mb: 4,
            letterSpacing: '0.5px',
          }}
        >
          Buy Token
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <Input
              type="number"
              placeholder="0.00"
              fullWidth
              startAdornment={
                <InputAdornment position="start">
                  <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Amount
                  </Typography>
                </InputAdornment>
              }
              sx={{
                color: 'white',
                fontSize: '1.5rem',
                '& input': {
                  textAlign: 'right',
                  color: 'white',
                  fontSize: '1.5rem',
                  '::placeholder': {
                    color: 'rgba(255, 255, 255, 0.3)',
                    opacity: 1,
                  },
                },
                '&.MuiInput-root': {
                  '&:before': {
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  },
                  '&:hover:not(.Mui-disabled):before': {
                    borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
                  },
                  '&:after': {
                    borderBottom: '1px solid rgba(255, 255, 255, 0.5)',
                  },
                },
                '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button':
                  {
                    WebkitAppearance: 'none',
                    margin: 0,
                  },
              }}
            />
            <Select
              displayEmpty
              defaultValue="ETH"
              sx={{
                minWidth: 120,
                color: 'white',
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderRadius: 2,
                '& .MuiSelect-select': {
                  textAlign: 'center',
                  color: 'white',
                  padding: '12px 32px 12px 14px',
                  fontSize: '1.1rem',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255,255,255,0.1)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255,255,255,0.3)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255,255,255,0.5)',
                },
                '.MuiSvgIcon-root': {
                  color: 'white',
                },
              }}
            >
              <MenuItem value="ETH">ETH</MenuItem>
              <MenuItem value="USDT">USDT</MenuItem>
            </Select>
          </Box>

          <Button
            variant="contained"
            fullWidth
            sx={{
              py: 2,
              backgroundColor: isConnected
                ? 'white'
                : 'rgba(255, 255, 255, 0.1)',
              color: isConnected ? 'black' : 'rgba(255, 255, 255, 0.4)',
              borderRadius: 2,
              fontSize: '1.1rem',
              textTransform: 'none',
              fontWeight: 600,
              opacity: isConnected ? 1 : 0.6,
              pointerEvents: isConnected ? 'auto' : 'none',
              cursor: isConnected ? 'pointer' : 'not-allowed',
              boxShadow: isConnected ? 'initial' : 'none',
              '&:hover': {
                backgroundColor: isConnected
                  ? 'rgba(255,255,255,0.9)'
                  : 'rgba(255, 255, 255, 0.1)',
                transform: isConnected ? 'translateY(-1px)' : 'none',
              },
              transition: 'all 0.2s ease',
            }}
          >
            {isConnected ? 'Buy Now' : 'Please connect your wallet'}
          </Button>
        </Box>
      </Paper>
    </Fade>
  );
}
