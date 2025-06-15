'use client';

import { createAppKit } from '@reown/appkit/react';
import { EthersAdapter } from '@reown/appkit-adapter-ethers';
import { mainnet, sepolia } from '@reown/appkit/networks';

const metadata = {
  name: 'Best Token',
  description: 'Buy the best token here',
  url: 'https://mywebsite.com',
  icons: ['https://avatars.mywebsite.com/'],
};

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) {
	throw new Error('ProjectId is not defiend!');
}

createAppKit({
	adapters: [new EthersAdapter()],
	metadata,
	networks: [mainnet, sepolia],
	projectId,
});
export function AppKitProvider({ children }: { children: React.ReactNode }) {

  return <>{children}</>;
}
