import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio | Binance Trading Platform',
  description: 'Track your cryptocurrency portfolio performance, view your holdings, profit/loss, and asset allocation in real-time.',
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

