import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trade BTC/USDT | Binance Trading Platform',
  description: 'Trade cryptocurrencies with advanced charts and real-time data',
};

export default function TradeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

