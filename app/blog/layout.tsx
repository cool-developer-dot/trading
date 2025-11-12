import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crypto Blog - Latest News & Analysis | Binance Clone',
  description: 'Stay updated with the latest cryptocurrency news, trading strategies, market analysis, and expert insights from the crypto world.',
  keywords: ['crypto blog', 'cryptocurrency news', 'trading tips', 'market analysis', 'bitcoin', 'ethereum', 'DeFi', 'NFTs'],
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

