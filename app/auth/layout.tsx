import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In / Sign Up | Binance Trading Platform',
  description: 'Sign in or create your Binance trading account. Secure access to cryptocurrency trading, spot markets, and more.',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

