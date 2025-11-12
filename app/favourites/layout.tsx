import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Favourites | Binance Trading Platform',
  description: 'Access your favorite cryptocurrencies and trading pairs. Track and manage your watchlist with real-time market data.',
};

export default function FavouritesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

