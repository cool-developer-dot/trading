import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Withdraw Funds | Binance Trading Platform',
  description: 'Withdraw cryptocurrency and fiat currency from your trading account. Fast, secure withdrawals.',
};

export default function WithdrawLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


