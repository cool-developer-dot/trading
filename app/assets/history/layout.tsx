import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Transaction History | Binance Trading Platform',
  description: 'View your complete transaction history including deposits, withdrawals, trades, and staking activities.',
};

export default function TransactionHistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

