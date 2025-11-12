import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'API Documentation | Binance Clone',
  description: 'Build powerful trading applications with our RESTful API. Access market data, manage accounts, and execute trades programmatically.',
};

export default function APIDocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

