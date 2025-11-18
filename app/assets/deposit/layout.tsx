import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Deposit Funds | Binance Trading Platform',
  description: 'Deposit cryptocurrency and fiat currency to your trading account. Fast, secure, and easy deposits.',
};

export default function DepositLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


