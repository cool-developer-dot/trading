import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Earn Rewards | Binance Trading Platform',
  description: 'Stake your cryptocurrency and earn passive income with competitive APY rates. Choose from flexible and locked staking options.',
};

export default function EarnRewardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

