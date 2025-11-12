import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Markets | Binance Trading Platform',
  description: 'Explore cryptocurrency markets and trading pairs',
};

export default function MarketsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

