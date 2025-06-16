'use client';

import {
  Paper,
  Select,
  Input,
  MenuItem,
  Button,
  Box,
  Typography,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import { ethers, BrowserProvider, Contract } from 'ethers';
import PresaleAbi from '@/abis/Presale.json';
import UsdtAbi from '@/abis/MockUSDT.json';
import TokenAbi from '@/abis/BestToken.json';
import {
  useAppKitProvider,
  useAppKitAccount,
  Provider,
} from '@reown/appkit/react';
import {
  TOKEN_ADDRESS,
  PRESALE_ADDRESS,
  USDT_ADDRESS,
} from '@/constants/const';
import BalancesTabel from '@/components/molecules/Tabels/BalancesTable';

export default function BuyForm() {
  const { address, isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider<Provider>('eip155');
  const [amount, setAmount] = useState('');
  const [tokenType, setTokenType] = useState<'ETH' | 'USDT'>('ETH');
  const [isPending, setIsPending] = useState(false);

  const [balances, setBalances] = useState({
    eth: '0',
    usdt: '0',
    bestToken: '0',
  });

  const fetchBalances = async () => {
    if (!walletProvider || !address || !isConnected) return;

    try {
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();
      const addr = await signer.getAddress();

      const usdt = new Contract(USDT_ADDRESS, UsdtAbi, signer);
      const token = new Contract(TOKEN_ADDRESS, TokenAbi, signer);

      const [ethBal, usdtBal, tokenBal] = await Promise.all([
        provider.getBalance(addr),
        usdt.balanceOf(addr),
        token.balanceOf(addr),
      ]);

      setBalances({
        eth: ethers.formatEther(ethBal),
        usdt: ethers.formatUnits(usdtBal, 6),
        bestToken: ethers.formatUnits(tokenBal, 18),
      });
    } catch (e) {
      console.log('Balance fetch failed:', e);
    }
  };

  useEffect(() => {
    if (isConnected && walletProvider && address) {
      fetchBalances();
    }
  }, [isConnected, walletProvider, address]);

  const handleBuy = async () => {
    if (!walletProvider || !isConnected) return;

    setIsPending(true);
    const provider = new BrowserProvider(walletProvider);
    const signer = await provider.getSigner();
    const presale = new Contract(PRESALE_ADDRESS, PresaleAbi, signer);

    try {
      let tx;
      if (tokenType === 'ETH') {
        const value = ethers.parseEther(amount);
        tx = await presale.buyWithEth({ value });
      } else {
        const parsed = BigInt(amount) * BigInt(1e6);

        const usdt = new Contract(USDT_ADDRESS, UsdtAbi, signer);
        const approval = await usdt.approve(PRESALE_ADDRESS, parsed);
        await approval.wait();

        tx = await presale.buyWithUsdt(parsed);
      }

      toast.success(`Transaction sent successfully: ${tx.hash}`, {
        duration: 3000,
      });
      console.log(`https://sepolia.etherscan.io/tx/${tx.hash}`);

      await tx.wait();
      await fetchBalances();
    } catch (err: any) {
      console.log(err);
      toast.error(
        'Transaction failed: ' +
          (err?.reason || err?.message || 'Unknown error')
      );
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Box sx={{ maxWidth: '600px', mx: 'auto', p: 2 }}>
      <Paper
        elevation={0}
        sx={{
          bgcolor: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(20px)',
          borderRadius: 4,
          border: '1px solid rgba(255, 255, 255, 0.1)',
          p: 4,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            fontWeight: 700,
            color: 'white',
            mb: 4,
            letterSpacing: '0.5px',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
            background: 'linear-gradient(45deg, #fff, #e0e0e0)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
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
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
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
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 2,
                px: 2,
                py: 1,
                transition: 'all 0.2s ease',
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
                    display: 'none',
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  },
                  '&:after': {
                    display: 'none',
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
              value={tokenType}
              onChange={(e) => setTokenType(e.target.value as 'ETH' | 'USDT')}
              sx={{
                minWidth: 120,
                color: 'white',
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderRadius: 2,
                transition: 'all 0.2s ease',
                '& .MuiSelect-select': {
                  textAlign: 'center',
                  color: 'white',
                  padding: '12px 32px 12px 14px',
                  fontSize: '1.1rem',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255,255,255,0.1)',
                },
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.08)',
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
            onClick={handleBuy}
            disabled={!isConnected || !amount || isPending}
            fullWidth
            sx={{
              py: 2,
              backgroundColor: isPending
                ? 'rgba(255, 255, 255, 0.15)'
                : isConnected
                ? 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
                : 'rgba(255, 255, 255, 0.15)',
              color: isPending
                ? 'rgba(255, 255, 255, 0.9)'
                : isConnected
                ? 'white'
                : 'rgba(255, 255, 255, 0.9)',
              borderRadius: 2,
              fontSize: '1.1rem',
              textTransform: 'none',
              fontWeight: 600,
              opacity: isConnected ? 1 : 0.8,
              pointerEvents: isConnected && !isPending ? 'auto' : 'none',
              cursor: isConnected && !isPending ? 'pointer' : 'not-allowed',
              boxShadow: isPending
                ? 'none'
                : isConnected
                ? '0 3px 5px 2px rgba(33, 203, 243, .3)'
                : 'none',
              '&:hover': {
                backgroundColor: isPending
                  ? 'rgba(255, 255, 255, 0.15)'
                  : isConnected
                  ? 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)'
                  : 'rgba(255, 255, 255, 0.15)',
                transform: isPending
                  ? 'none'
                  : isConnected
                  ? 'translateY(-2px)'
                  : 'none',
                boxShadow: isPending
                  ? 'none'
                  : isConnected
                  ? '0 6px 10px 2px rgba(33, 203, 243, .3)'
                  : 'none',
              },
              transition: 'all 0.3s ease',
              position: 'relative',
            }}
          >
            {isPending ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress
                  size={20}
                  sx={{ color: 'rgba(255, 255, 255, 0.9)' }}
                />
                Processing...
              </Box>
            ) : isConnected ? (
              'Buy Now'
            ) : (
              'Please connect your wallet'
            )}
          </Button>
        </Box>
      </Paper>
      <BalancesTabel balances={balances} />
    </Box>
  );
}
