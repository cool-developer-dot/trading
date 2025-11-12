import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy | Binance Clone',
  description: 'Learn about our cookie usage and manage your cookie preferences. Understand how we use cookies to enhance your experience.',
};

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

