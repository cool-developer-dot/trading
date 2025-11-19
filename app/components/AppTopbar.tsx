'use client';

import { memo, useState, useCallback, useMemo, useEffect } from 'react';
import SearchModal from './SearchModal';

const MenuIcon = memo(() => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
));
MenuIcon.displayName = 'MenuIcon';

const SearchIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
));
SearchIcon.displayName = 'SearchIcon';

const BellIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
));
BellIcon.displayName = 'BellIcon';

const LanguageIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
  </svg>
));
LanguageIcon.displayName = 'LanguageIcon';

const XIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
));
XIcon.displayName = 'XIcon';

interface AppTopbarProps {
  isCollapsed: boolean;
  onMenuClick: () => void;
}

const AppTopbar = ({ isCollapsed, onMenuClick }: AppTopbarProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'BTC Price Alert', message: 'Bitcoin reached $102,000!', time: '2m ago', read: false },
    { id: 2, title: 'Trade Executed', message: 'Your ETH buy order was filled', time: '15m ago', read: false },
    { id: 3, title: 'New Feature', message: 'Try our new portfolio tracker', time: '1h ago', read: true },
    { id: 4, title: 'Market Update', message: 'SOL up 8.45% in 24h', time: '2h ago', read: true },
  ]);

  // Handle client-side mounting to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSearchClick = useCallback(() => {
    setIsSearchOpen(true);
  }, []);

  const handleSearchClose = useCallback(() => {
    setIsSearchOpen(false);
  }, []);

  const handleNotificationClick = useCallback(() => {
    setIsNotificationOpen((prev) => !prev);
  }, []);

  const handleMarkAsRead = useCallback((id: number) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  }, []);

  const handleMarkAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.notification-dropdown') && !target.closest('.notification-button')) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsNotificationOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const unreadCount = useMemo(() => notifications.filter((n) => !n.read).length, [notifications]);

  return (
    <div className="fixed top-0 left-0 right-0 md:left-64 h-16 bg-white border-b border-gray-200 z-30 flex items-center justify-between px-4 md:px-6 transition-all duration-300"
      style={{
        left: isMounted && window.innerWidth >= 768 ? (isCollapsed ? '5rem' : '16rem') : '0'
      }}
    >
      {/* Left: Hamburger Menu (Mobile) + Page Title */}
      <div className="flex items-center gap-3">
        {/* Hamburger Icon - Only visible on mobile */}
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors md:hidden"
          aria-label="Open menu"
        >
          <MenuIcon />
        </button>
        
        {/* Page Title */}
        <div>
          <h1 className="text-base sm:text-lg md:text-xl font-bold text-black">Trading Platform</h1>
          <p className="text-xs text-gray-500 hidden sm:block">Welcome back! Ready to trade?</p>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Search Bar - Desktop */}
        <button
          onClick={handleSearchClick}
          className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <SearchIcon />
          <span className="text-sm text-gray-600 hidden lg:inline">Search...</span>
          <kbd className="hidden lg:flex items-center px-2 py-1 bg-white border border-gray-300 rounded text-xs text-gray-500">
            ⌘K
          </kbd>
        </button>

        {/* Search Button - Mobile */}
        <button
          onClick={handleSearchClick}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <SearchIcon />
        </button>

        {/* Language Selector - Hidden on mobile */}
        <button className="hidden lg:block p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Change Language">
          <LanguageIcon />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={handleNotificationClick}
            className="notification-button relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <BellIcon />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>

          {/* Notification Dropdown */}
          {isNotificationOpen && (
            <div className="notification-dropdown absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 max-h-[500px] overflow-hidden flex flex-col animate-fade-in">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-black">Notifications</h3>
                  <button
                    onClick={() => setIsNotificationOpen(false)}
                    className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <XIcon />
                  </button>
                </div>
                {unreadCount > 0 && (
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      {unreadCount} unread
                    </p>
                    <button
                      onClick={handleMarkAllAsRead}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Mark all as read
                    </button>
                  </div>
                )}
              </div>

              <div className="overflow-y-auto flex-1">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => handleMarkAsRead(notif.id)}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${
                      !notif.read ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-black mb-1 truncate">{notif.title}</h4>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{notif.message}</p>
                        <span className="text-xs text-gray-500">{notif.time}</span>
                      </div>
                      {!notif.read && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {notifications.length > 0 && (
                <div className="p-3 border-t border-gray-200">
                  <button className="w-full py-2 text-sm font-medium text-black hover:bg-gray-50 rounded-lg transition-colors">
                    View All
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Live Market Indicator - Hidden on small mobile */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs font-semibold text-green-700 hidden lg:inline">Markets Live</span>
        </div>
      </div>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={handleSearchClose} />
    </div>
  );
};

export default memo(AppTopbar);
