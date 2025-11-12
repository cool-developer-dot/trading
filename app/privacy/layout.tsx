import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Binance Clone',
  description: 'Learn how we collect, use, and protect your personal information. Read our comprehensive privacy policy.',
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

