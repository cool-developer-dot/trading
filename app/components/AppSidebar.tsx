'use client';

import { memo, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Icon Components (keeping all the same icons)
const HomeIcon = memo(() => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
));
HomeIcon.displayName = 'HomeIcon';

const MarketsIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
));
MarketsIcon.displayName = 'MarketsIcon';

const TradeIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>
));
TradeIcon.displayName = 'TradeIcon';

const PortfolioIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
));
PortfolioIcon.displayName = 'PortfolioIcon';

const AssetsIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
));
AssetsIcon.displayName = 'AssetsIcon';

const BlogIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
));
BlogIcon.displayName = 'BlogIcon';

const ChatIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
));
ChatIcon.displayName = 'ChatIcon';

const HelpIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
));
HelpIcon.displayName = 'HelpIcon';

const ChevronLeftIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
));
ChevronLeftIcon.displayName = 'ChevronLeftIcon';

const XIcon = memo(() => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
));
XIcon.displayName = 'XIcon';

const UserIcon = memo(() => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
));
UserIcon.displayName = 'UserIcon';

const DepositIcon = memo(() => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m0 0l-4-4m4 4l4-4" />
  </svg>
));
DepositIcon.displayName = 'DepositIcon';

const WithdrawIcon = memo(() => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20V4m0 0l4 4m-4-4l-4 4" />
  </svg>
));
WithdrawIcon.displayName = 'WithdrawIcon';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  onClose: () => void;
  isMobileOpen: boolean;
}

const AppSidebar = ({ isCollapsed, onToggle, onClose, isMobileOpen }: SidebarProps) => {
  const pathname = usePathname();

  const navItems = useMemo(
    () => [
      { name: 'Home', icon: <HomeIcon />, href: '/', badge: null },
      { name: 'Markets', icon: <MarketsIcon />, href: '/markets', badge: null },
      { name: 'Trade', icon: <TradeIcon />, href: '/trade', badge: 'Hot' },
      { name: 'Portfolio', icon: <PortfolioIcon />, href: '/portfolio', badge: null },
      { name: 'Assets', icon: <AssetsIcon />, href: '/assets', badge: null },
    ],
    []
  );

  const secondaryItems = useMemo(
    () => [
      { name: 'Blog', icon: <BlogIcon />, href: '/blog' },
      { name: 'Chat Support', icon: <ChatIcon />, href: '/chat' },
      { name: 'Help Center', icon: <HelpIcon />, href: '/help-center' },
    ],
    []
  );

  const quickActions = useMemo(
    () => [
      { name: 'Deposit', icon: <DepositIcon />, href: '/assets/deposit', color: 'bg-green-500' },
      { name: 'Withdraw', icon: <WithdrawIcon />, href: '/assets/withdraw', color: 'bg-red-500' },
    ],
    []
  );

  return (
    <aside
      className={`
        fixed left-0 top-0 h-screen bg-white border-r border-gray-200 z-50 flex flex-col
        transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-20' : 'w-64'}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}
    >
      {/* Logo & Toggle */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 flex-shrink-0">
        {!isCollapsed && (
          <Link href="/" className="flex items-center gap-2" onClick={onClose}>
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white font-bold text-xl">
              B
            </div>
            <span className="text-black font-bold text-lg">Binance</span>
          </Link>
        )}
        {isCollapsed && (
          <Link href="/" className="flex items-center justify-center w-full" onClick={onClose}>
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white font-bold text-xl">
              B
            </div>
          </Link>
        )}
        
        {/* Mobile: X button, Desktop: Collapse arrow */}
        {!isCollapsed && (
          <>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors md:hidden"
              aria-label="Close menu"
            >
              <XIcon />
            </button>
            
            <button
              onClick={onToggle}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors hidden md:block"
              aria-label="Collapse sidebar"
            >
              <ChevronLeftIcon />
            </button>
          </>
        )}
        
        {/* When collapsed on desktop, show expand button */}
        {isCollapsed && (
          <button
            onClick={onToggle}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors hidden md:block ml-auto"
            aria-label="Expand sidebar"
          >
            <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
      </div>

      {/* User Profile */}
      <Link
        href="/auth"
        onClick={onClose}
        className={`m-4 p-3 bg-gradient-to-r from-gray-900 to-black rounded-xl text-white hover:shadow-lg transition-all flex-shrink-0 ${
          isCollapsed ? 'flex items-center justify-center' : ''
        }`}
      >
        {isCollapsed ? (
          <UserIcon />
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <UserIcon />
              </div>
              <div>
                <div className="font-bold text-sm">Welcome</div>
                <div className="text-xs text-gray-300">Sign in to trade</div>
              </div>
            </div>
            <div className="text-xs text-gray-400">Click to login or register</div>
          </div>
        )}
      </Link>

      {/* Quick Actions */}
      {!isCollapsed && (
        <div className="px-4 mb-4 flex-shrink-0">
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action) => (
              <Link
                key={action.name}
                href={action.href}
                onClick={onClose}
                className={`${action.color} text-white rounded-lg p-3 hover:opacity-90 transition-opacity`}
              >
                <div className="flex items-center justify-center mb-1">{action.icon}</div>
                <div className="text-xs font-semibold text-center">{action.name}</div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Navigation - Scrollable */}
      <nav className="flex-1 overflow-y-auto px-2 scrollbar-hide">
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-black text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                } ${isCollapsed ? 'justify-center' : ''}`}
                title={isCollapsed ? item.name : undefined}
              >
                <div className="flex-shrink-0">{item.icon}</div>
                {!isCollapsed && (
                  <>
                    <span className="font-medium text-sm flex-1">{item.name}</span>
                    {item.badge && (
                      <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full font-bold">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </div>

        <div className="my-4 border-t border-gray-200" />

        <div className="space-y-1">
          {!isCollapsed && (
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
              Support
            </div>
          )}
          {secondaryItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-gray-100 text-black'
                    : 'text-gray-600 hover:bg-gray-50'
                } ${isCollapsed ? 'justify-center' : ''}`}
                title={isCollapsed ? item.name : undefined}
              >
                <div className="flex-shrink-0">{item.icon}</div>
                {!isCollapsed && <span className="font-medium text-sm">{item.name}</span>}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom Info */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200 flex-shrink-0">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 mb-2">
            <div className="text-xs font-semibold text-gray-800 mb-1">
              🎁 Trading Bonus
            </div>
            <div className="text-xs text-gray-600 mb-2">
              Get 0% fees on your first trade
            </div>
            <Link
              href="/trade"
              onClick={onClose}
              className="block w-full py-2 bg-black text-white text-xs font-bold rounded-lg text-center hover:bg-gray-800 transition-colors"
            >
              Start Trading
            </Link>
          </div>
          <div className="text-xs text-gray-500 text-center">
            © 2024 Binance Clone
          </div>
        </div>
      )}
    </aside>
  );
};

export default memo(AppSidebar);
