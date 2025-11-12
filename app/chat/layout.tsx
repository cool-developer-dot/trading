import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '24/7 Live Chat Support | Binance Clone',
  description: 'Get instant help from our support team. Chat with us 24/7 for assistance with your trading account.',
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

