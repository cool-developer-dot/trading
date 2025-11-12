import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use | Binance Clone',
  description: 'Read our Terms of Use to understand the rules and regulations governing the use of our cryptocurrency trading platform.',
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

