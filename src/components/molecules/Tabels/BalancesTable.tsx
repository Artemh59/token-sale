import {
  Box,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
	Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { ethers, BrowserProvider, Contract } from 'ethers';
import TokenAbi from '@/abis/BestToken.json';
import UsdtAbi from '@/abis/MockUSDT.json';
import {
  useAppKitProvider,
  useAppKitAccount,
  Provider,
} from '@reown/appkit/react';
import {
  USDT_ADDRESS,
  TOKEN_ADDRESS,
} from '@/constants/const';

interface BalancesTabelProp {
	balances: {
		eth: string;
		usdt: string;
		bestToken: string;
	}
}

export default function BalancesTabel({ balances }: BalancesTabelProp) {

  return (
		<Box
			sx={{
				mt: 4,
				backgroundColor: 'rgba(255, 255, 255, 0.03)',
				backdropFilter: 'blur(20px)',
				borderRadius: 4,
				border: '1px solid rgba(255, 255, 255, 0.1)',
				overflow: 'hidden',
				transition: 'all 0.3s ease',
				'&:hover': {
					border: '1px solid rgba(255, 255, 255, 0.2)',
				},
			}}
		>
			<Table size="small" sx={{ color: 'white' }}>
				<TableHead>
					<TableRow>
						<TableCell
							sx={{
								color: 'white',
								borderBottom: '1px solid rgba(255,255,255,0.1)',
								fontWeight: 600,
								fontSize: '1.1rem',
								py: 2,
							}}
						>
							Asset
						</TableCell>
						<TableCell
							sx={{
								color: 'white',
								borderBottom: '1px solid rgba(255,255,255,0.1)',
								fontWeight: 600,
								fontSize: '1.1rem',
								py: 2,
							}}
						>
							Balance
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow>
						<TableCell
							sx={{
								color: 'white',
								borderBottom: '1px solid rgba(255,255,255,0.05)',
								py: 2,
							}}
						>
							ETH
						</TableCell>
						<TableCell
							sx={{
								color: 'white',
								borderBottom: '1px solid rgba(255,255,255,0.05)',
								py: 2,
							}}
						>
							{balances.eth}
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell
							sx={{
								color: 'white',
								borderBottom: '1px solid rgba(255,255,255,0.05)',
								py: 2,
							}}
						>
							USDT
						</TableCell>
						<TableCell
							sx={{
								color: 'white',
								borderBottom: '1px solid rgba(255,255,255,0.05)',
								py: 2,
							}}
						>
							{balances.usdt}
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell
							sx={{
								color: 'white',
								borderBottom: 'none',
								py: 2,
							}}
						>
							BestToken
						</TableCell>
						<TableCell
							sx={{
								color: 'white',
								borderBottom: 'none',
								py: 2,
							}}
						>
							{balances.bestToken}
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</Box>
	)
}
