import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Help Center | Binance Clone',
  description: 'Find answers to common questions, guides, and tutorials. Get help with trading, deposits, withdrawals, security, and more.',
};

export default function HelpCenterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

