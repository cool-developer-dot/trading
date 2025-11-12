import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Convert Assets | Binance Trading Platform',
  description: 'Instantly convert between cryptocurrencies with competitive rates and low fees. Quick and secure asset conversion.',
};

export default function ConvertAssetsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

