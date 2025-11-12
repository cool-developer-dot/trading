'use client';

import { memo, useCallback, useMemo, useState, useEffect, type ReactNode } from 'react';
import Link from 'next/link';
import SearchModal from './SearchModal';

// Icon Components - Optimized for reusability and performance
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

const FavouritesIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
));
FavouritesIcon.displayName = 'FavouritesIcon';

const PortsIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
));
PortsIcon.displayName = 'PortsIcon';

const AssetsIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
));
AssetsIcon.displayName = 'AssetsIcon';

const BlogsIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
));
BlogsIcon.displayName = 'BlogsIcon';

const SearchIcon = memo(() => (
  <svg className="w-4 h-4 text-gray-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
));
SearchIcon.displayName = 'SearchIcon';

const LanguageIcon = memo(() => (
  <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
  </svg>
));
LanguageIcon.displayName = 'LanguageIcon';

const MobileIcon = memo(() => (
  <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
));
MobileIcon.displayName = 'MobileIcon';

const BellIcon = memo(() => (
  <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
));
BellIcon.displayName = 'BellIcon';

const UserIcon = memo(() => (
  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
));
UserIcon.displayName = 'UserIcon';

const ShareIcon = memo(() => (
  <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
  </svg>
));
ShareIcon.displayName = 'ShareIcon';

const CloseIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
));
CloseIcon.displayName = 'CloseIcon';

const CheckIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
));
CheckIcon.displayName = 'CheckIcon';

// Navigation Button Component - Optimized with memo
interface NavButtonProps {
  name: string;
  icon: ReactNode;
  isActive: boolean;
  onClick: () => void;
  href: string;
}

const NavButton = memo(({ name, icon, isActive, onClick, href }: NavButtonProps) => (
  <Link
    href={href}
    onClick={onClick}
    className={`relative flex flex-col items-center justify-center px-4 xl:px-6 h-14 transition-all duration-200 ${
      isActive ? 'text-black' : 'text-gray-600 hover:text-black'
    }`}
    aria-label={name}
    aria-current={isActive ? 'page' : undefined}
  >
    <div className={`mb-0.5 transition-all duration-200 ${isActive ? 'opacity-100' : 'opacity-60'}`}>
      {icon}
    </div>
    <span className="text-xs font-normal">{name}</span>
    {isActive && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />}
  </Link>
));
NavButton.displayName = 'NavButton';

// Mobile Navigation Button Component
const MobileNavButton = memo(({ name, icon, isActive, onClick, href }: NavButtonProps) => (
  <Link
    href={href}
    onClick={onClick}
    className={`relative flex flex-col items-center justify-center px-4 py-2 min-w-fit transition-all duration-200 ${
      isActive ? 'text-black' : 'text-gray-600'
    }`}
    aria-label={name}
    aria-current={isActive ? 'page' : undefined}
  >
    <div className={`mb-0.5 transition-all ${isActive ? 'opacity-100' : 'opacity-60'}`}>
      {icon}
    </div>
    <span className="text-xs font-normal whitespace-nowrap">{name}</span>
    {isActive && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />}
  </Link>
));
MobileNavButton.displayName = 'MobileNavButton';

// Main Header Component
const Header = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'BTC Price Alert', message: 'Bitcoin reached $102,000!', time: '2m ago', read: false },
    { id: 2, title: 'Trade Executed', message: 'Your ETH buy order was filled', time: '15m ago', read: false },
    { id: 3, title: 'New Feature', message: 'Try our new portfolio tracker', time: '1h ago', read: true },
    { id: 4, title: 'Market Update', message: 'SOL up 8.45% in 24h', time: '2h ago', read: true },
  ]);
  const [copySuccess, setCopySuccess] = useState(false);

  // Memoize navigation items to prevent recreation on every render
  const navItems = useMemo(
    () => [
      { name: 'Home', icon: <HomeIcon />, href: '/' },
      { name: 'Markets', icon: <MarketsIcon />, href: '/markets' },
      { name: 'Trade', icon: <TradeIcon />, href: '/trade' },
      { name: 'Favourites', icon: <FavouritesIcon />, href: '/favourites' },
      { name: 'Portfolio', icon: <PortsIcon />, href: '/portfolio' },
      { name: 'Assets', icon: <AssetsIcon />, href: '/assets' },
      { name: 'Blog', icon: <BlogsIcon />, href: '/blog' },
    ],
    []
  );

  // Memoize click handler to prevent recreation
  const handleTabClick = useCallback((tabName: string) => {
    setActiveTab(tabName);
  }, []);

  const handleSearchClick = useCallback(() => {
    setIsSearchOpen(true);
  }, []);

  const handleSearchClose = useCallback(() => {
    setIsSearchOpen(false);
  }, []);

  const handleNotificationClick = useCallback(() => {
    setIsNotificationOpen((prev) => !prev);
    setIsShareOpen(false);
  }, []);

  const handleShareClick = useCallback(() => {
    setIsShareOpen((prev) => !prev);
    setIsNotificationOpen(false);
  }, []);

  const handleMarkAsRead = useCallback((id: number) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  }, []);

  const handleMarkAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  }, []);

  const handleSharePlatform = useCallback(async (platform: string) => {
    const url = window.location.href;
    const text = 'Check out this amazing crypto trading platform - Binance Clone!';
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
        break;
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(url);
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
          console.error('Failed to copy:', err);
        }
        break;
    }
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.notification-dropdown') && !target.closest('.notification-button')) {
        setIsNotificationOpen(false);
      }
      if (!target.closest('.share-dropdown') && !target.closest('.share-button')) {
        setIsShareOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Global keyboard shortcut (Ctrl+K / Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      // ESC to close dropdowns
      if (e.key === 'Escape') {
        setIsNotificationOpen(false);
        setIsShareOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const unreadCount = useMemo(() => notifications.filter((n) => !n.read).length, [notifications]);

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="w-full px-4">
        <div className="flex items-center justify-between h-14">
          {/* Left side: Logo + Navigation */}
          <div className="flex items-center flex-1 min-w-0">
            {/* Logo */}
            <Link href="/" className="flex items-center cursor-pointer group flex-shrink-0 mr-4">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
                B
              </div>
              <span className="ml-2 text-black font-semibold text-base hidden sm:block">
                Binance
              </span>
            </Link>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex items-center space-x-0 flex-1" role="navigation">
              {navItems.map((item) => (
                <NavButton
                  key={item.name}
                  name={item.name}
                  icon={item.icon}
                  href={item.href}
                  isActive={activeTab === item.name}
                  onClick={() => handleTabClick(item.name)}
                />
              ))}
            </nav>
          </div>

          {/* Right side - Search and User */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            {/* Search Bar - Desktop */}
            <button
              onClick={handleSearchClick}
              className="hidden lg:flex items-center justify-between bg-gray-100 rounded-md px-3 py-2 w-56 xl:w-72 hover:bg-gray-200 transition-colors cursor-pointer group"
              aria-label="Open search"
            >
              <div className="flex items-center gap-2">
                <SearchIcon />
                <span className="text-sm text-gray-500">Search coins, markets...</span>
              </div>
              <kbd className="hidden xl:flex items-center gap-1 px-2 py-1 bg-white border border-gray-300 rounded text-xs text-gray-500 group-hover:border-gray-400">
                <span className="text-xs">⌘</span>K
              </kbd>
            </button>

            {/* Search Button - Mobile */}
            <button
              onClick={handleSearchClick}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-md transition-colors"
              aria-label="Search"
            >
              <SearchIcon />
            </button>

            {/* Language Selector */}
            <button 
              className="hidden lg:flex items-center space-x-1 px-2 py-2 hover:bg-gray-100 rounded-md transition-colors"
              aria-label="Change language"
            >
              <LanguageIcon />
              <span className="text-xs text-black font-medium">EN</span>
            </button>

            {/* Download App */}
            <button 
              className="hidden lg:block p-2 hover:bg-gray-100 rounded-md transition-colors"
              aria-label="Download app"
            >
              <MobileIcon />
            </button>

            {/* Share Button */}
            <div className="relative">
              <button 
                onClick={handleShareClick}
                className="share-button p-2 hover:bg-gray-100 rounded-md transition-colors"
                aria-label="Share"
              >
                <ShareIcon />
              </button>

              {/* Share Dropdown */}
              {isShareOpen && (
                <div className="share-dropdown absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 animate-fade-in">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-black">Share</h3>
                      <button
                        onClick={() => setIsShareOpen(false)}
                        className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label="Close"
                      >
                        <CloseIcon />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600">Share this page with your friends</p>
                  </div>

                  <div className="p-4 space-y-2">
                    {/* Share Platforms */}
                    <button
                      onClick={() => handleSharePlatform('twitter')}
                      className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="w-10 h-10 bg-[#1DA1F2] rounded-lg flex items-center justify-center text-white font-bold">
                        𝕏
                      </div>
                      <span className="text-sm font-medium text-black">Share on Twitter</span>
                    </button>

                    <button
                      onClick={() => handleSharePlatform('facebook')}
                      className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="w-10 h-10 bg-[#1877F2] rounded-lg flex items-center justify-center text-white font-bold text-xl">
                        f
                      </div>
                      <span className="text-sm font-medium text-black">Share on Facebook</span>
                    </button>

                    <button
                      onClick={() => handleSharePlatform('linkedin')}
                      className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="w-10 h-10 bg-[#0A66C2] rounded-lg flex items-center justify-center text-white font-bold">
                        in
                      </div>
                      <span className="text-sm font-medium text-black">Share on LinkedIn</span>
                    </button>

                    <button
                      onClick={() => handleSharePlatform('whatsapp')}
                      className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="w-10 h-10 bg-[#25D366] rounded-lg flex items-center justify-center text-white font-bold text-xl">
                        ⟨⟩
                      </div>
                      <span className="text-sm font-medium text-black">Share on WhatsApp</span>
                    </button>

                    <button
                      onClick={() => handleSharePlatform('telegram')}
                      className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="w-10 h-10 bg-[#0088cc] rounded-lg flex items-center justify-center text-white font-bold text-xl">
                        ✈
                      </div>
                      <span className="text-sm font-medium text-black">Share on Telegram</span>
                    </button>

                    <div className="pt-2 border-t border-gray-200">
                      <button
                        onClick={() => handleSharePlatform('copy')}
                        className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <span className="text-sm font-medium text-black">Copy Link</span>
                        {copySuccess ? (
                          <div className="flex items-center gap-2 text-green-600">
                            <CheckIcon />
                            <span className="text-xs font-medium">Copied!</span>
                          </div>
                        ) : (
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={handleNotificationClick}
                className="notification-button relative p-2 hover:bg-gray-100 rounded-md transition-colors"
                aria-label="Notifications"
              >
                <BellIcon />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" aria-hidden="true" />
                )}
              </button>

              {/* Notification Dropdown */}
              {isNotificationOpen && (
                <div className="notification-dropdown absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 animate-fade-in max-h-[500px] overflow-hidden flex flex-col">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-black">Notifications</h3>
                      <button
                        onClick={() => setIsNotificationOpen(false)}
                        className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label="Close"
                      >
                        <CloseIcon />
                      </button>
                    </div>
                    {unreadCount > 0 && (
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600">{unreadCount} unread notification{unreadCount > 1 ? 's' : ''}</p>
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
                    {notifications.length > 0 ? (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => handleMarkAsRead(notif.id)}
                          className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${
                            !notif.read ? 'bg-blue-50' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <h4 className="text-sm font-bold text-black mb-1">{notif.title}</h4>
                              <p className="text-sm text-gray-600 mb-2">{notif.message}</p>
                              <span className="text-xs text-gray-500">{notif.time}</span>
                            </div>
                            {!notif.read && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1" />
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <BellIcon />
                        </div>
                        <p className="text-sm text-gray-600">No notifications yet</p>
                      </div>
                    )}
                  </div>

                  {notifications.length > 0 && (
                    <div className="p-3 border-t border-gray-200">
                      <button className="w-full py-2 text-sm font-medium text-black hover:bg-gray-50 rounded-lg transition-colors">
                        View All Notifications
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* User Profile */}
            <Link 
              href="/auth"
              className="p-2 hover:bg-gray-100 rounded-md transition-colors"
              aria-label="User profile"
            >
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <UserIcon />
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex overflow-x-auto border-t border-gray-200 -mx-4 px-4 scrollbar-hide" role="navigation">
          {navItems.map((item) => (
            <MobileNavButton
              key={item.name}
              name={item.name}
              icon={item.icon}
              href={item.href}
              isActive={activeTab === item.name}
              onClick={() => handleTabClick(item.name)}
            />
          ))}
        </nav>
      </div>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={handleSearchClose} />
    </header>
  );
};

// Export memoized component to prevent unnecessary re-renders
export default memo(Header);
