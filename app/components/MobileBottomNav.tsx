'use client';

import { memo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const HomeIcon = memo(() => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
));
HomeIcon.displayName = 'HomeIcon';

const MarketsIcon = memo(() => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
));
MarketsIcon.displayName = 'MarketsIcon';

const TradeIcon = memo(() => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>
));
TradeIcon.displayName = 'TradeIcon';

const PortfolioIcon = memo(() => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
));
PortfolioIcon.displayName = 'PortfolioIcon';

const AssetsIcon = memo(() => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
));
AssetsIcon.displayName = 'AssetsIcon';

const MobileBottomNav = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', icon: <HomeIcon />, href: '/' },
    { name: 'Markets', icon: <MarketsIcon />, href: '/markets' },
    { name: 'Trade', icon: <TradeIcon />, href: '/trade' },
    { name: 'Portfolio', icon: <PortfolioIcon />, href: '/portfolio' },
    { name: 'Assets', icon: <AssetsIcon />, href: '/assets' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-40">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center py-2 px-3 min-w-0 flex-1 transition-colors ${
                isActive ? 'text-black' : 'text-gray-500'
              }`}
            >
              <div className={`mb-1 ${isActive ? 'scale-110' : ''} transition-transform`}>
                {item.icon}
              </div>
              <span className="text-xs font-medium truncate w-full text-center">{item.name}</span>
              {isActive && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-black rounded-b-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default memo(MobileBottomNav);

