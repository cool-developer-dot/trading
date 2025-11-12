import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Assets | Binance Trading Platform',
  description: 'Manage your cryptocurrency portfolio. View balances, deposit, withdraw, and track your crypto assets.',
};

export default function AssetsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

