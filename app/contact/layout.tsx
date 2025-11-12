import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Binance Clone',
  description: 'Get in touch with our support team. We\'re here to help with any questions or concerns about your trading experience.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

