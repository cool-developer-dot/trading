import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compliance & Regulatory | Binance Clone',
  description: 'Learn about our commitment to regulatory compliance, AML/KYC procedures, and industry best practices.',
};

export default function ComplianceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

