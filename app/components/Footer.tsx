'use client';

import { memo, useState, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';

// Language options
const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
];

// Currency options
const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'KRW', symbol: '₩', name: 'Korean Won' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
];

const Footer = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);
  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCIES[0]);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  
  const languageRef = useRef<HTMLDivElement>(null);
  const currencyRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setIsLanguageOpen(false);
      }
      if (currencyRef.current && !currencyRef.current.contains(event.target as Node)) {
        setIsCurrencyOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleLanguageDropdown = useCallback(() => {
    setIsLanguageOpen(prev => !prev);
    setIsCurrencyOpen(false);
  }, []);

  const toggleCurrencyDropdown = useCallback(() => {
    setIsCurrencyOpen(prev => !prev);
    setIsLanguageOpen(false);
  }, []);

  const handleLanguageSelect = useCallback((language: typeof LANGUAGES[0]) => {
    setSelectedLanguage(language);
    setIsLanguageOpen(false);
  }, []);

  const handleCurrencySelect = useCallback((currency: typeof CURRENCIES[0]) => {
    setSelectedCurrency(currency);
    setIsCurrencyOpen(false);
  }, []);

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden w-full">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-white rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-white rounded-full filter blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16 relative z-10">
        {/* Top Section - Brand & Social */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 mb-8 sm:mb-12 lg:mb-16 pb-8 sm:pb-12 lg:pb-16 border-b border-gray-800">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center mb-4 sm:mb-6 group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-xl flex items-center justify-center text-black font-bold text-xl sm:text-2xl shadow-2xl group-hover:scale-110 transition-transform duration-300">
                B
              </div>
              <span className="ml-2 sm:ml-3 text-xl sm:text-2xl font-bold">Binance</span>
            </Link>
            <p className="text-gray-400 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
              The world's leading cryptocurrency exchange. Trade with confidence, security, and speed.
            </p>
            
            {/* Social Media */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 hover:bg-white hover:text-black rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl" aria-label="Twitter">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 hover:bg-white hover:text-black rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl" aria-label="Facebook">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 hover:bg-white hover:text-black rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl" aria-label="Instagram">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" stroke="currentColor" fill="none" strokeWidth="2" />
                </svg>
              </a>
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 hover:bg-white hover:text-black rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl" aria-label="Telegram">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.03-1.99 1.27-5.62 3.72-.53.36-1.01.54-1.44.53-.47-.01-1.38-.27-2.06-.49-.83-.27-1.49-.42-1.43-.88.03-.24.37-.48 1.02-.73 3.99-1.73 6.66-2.88 8.01-3.44 3.81-1.59 4.6-1.87 5.12-1.88.11 0 .37.03.53.17.14.11.18.26.19.37.01.08.02.33 0 .51z" />
                </svg>
              </a>
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 hover:bg-white hover:text-black rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl" aria-label="YouTube">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 9.71a8.5 8.5 0 00-.91-4.13 2.92 2.92 0 00-1.72-1A78.36 78.36 0 0012 4.27a78.45 78.45 0 00-8.34.3 2.87 2.87 0 00-1.46.74c-.9.83-1 2.25-1.1 3.45a48.29 48.29 0 000 6.48 2.87 2.87 0 00.67 1.94 2.87 2.87 0 001.73.91 78.33 78.33 0 008.5.3c2.83 0 5.67-.1 8.5-.3a2.88 2.88 0 001.73-.91 2.88 2.88 0 00.67-1.94 48.14 48.14 0 00.09-6.52zM9.74 14.85V8.66l5.92 3.11c-1.66.92-3.85 1.96-5.92 3.08z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <h4 className="font-bold text-white mb-3 sm:mb-4 text-base sm:text-lg">Products</h4>
              <ul className="space-y-2 sm:space-y-3">
                <li><Link href="/markets" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2 group-hover:bg-white transition-colors" />
                  Markets
                </Link></li>
                <li><Link href="/trade" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2 group-hover:bg-white transition-colors" />
                  Trade
                </Link></li>
                <li><Link href="/favourites" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2 group-hover:bg-white transition-colors" />
                  Favourites
                </Link></li>
                <li><a href="#" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2 group-hover:bg-white transition-colors" />
                  Earn
                </a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3 sm:mb-4 text-base sm:text-lg">Company</h4>
              <ul className="space-y-2 sm:space-y-3">
                <li><a href="#" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2 group-hover:bg-white transition-colors" />
                  About Us
                </a></li>
                <li><a href="#" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2 group-hover:bg-white transition-colors" />
                  Careers
                </a></li>
                <li><a href="#" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2 group-hover:bg-white transition-colors" />
                  Press
                </a></li>
                <li><Link href="/blog" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2 group-hover:bg-white transition-colors" />
                  Blog
                </Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3 sm:mb-4 text-base sm:text-lg">Support</h4>
              <ul className="space-y-2 sm:space-y-3">
                <li><Link href="/help-center" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2 group-hover:bg-white transition-colors" />
                  Help Center
                </Link></li>
                <li><Link href="/contact" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2 group-hover:bg-white transition-colors" />
                  Contact Us
                </Link></li>
                <li><Link href="/chat" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2 group-hover:bg-white transition-colors" />
                  24/7 Chat
                </Link></li>
                <li><Link href="/api-docs" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2 group-hover:bg-white transition-colors" />
                  API Docs
                </Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3 sm:mb-4 text-base sm:text-lg">Legal</h4>
              <ul className="space-y-2 sm:space-y-3">
                <li><Link href="/terms" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2 group-hover:bg-white transition-colors" />
                  Terms of Use
                </Link></li>
                <li><Link href="/privacy" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2 group-hover:bg-white transition-colors" />
                  Privacy Policy
                </Link></li>
                <li><Link href="/cookies" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2 group-hover:bg-white transition-colors" />
                  Cookie Policy
                </Link></li>
                <li><Link href="/compliance" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2 group-hover:bg-white transition-colors" />
                  Compliance
                </Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12 pb-8 sm:pb-12 border-b border-gray-800">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Stay Updated</h3>
            <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6">Get the latest crypto news, market insights, and exclusive offers.</p>
          </div>
          <div>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-white focus:border-transparent outline-none transition-all"
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-white text-black rounded-lg font-bold hover:bg-gray-200 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-2 sm:mt-3">By subscribing, you agree to our Privacy Policy and consent to receive updates.</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-6 text-xs sm:text-sm text-gray-400">
            <span className="text-center">&copy; 2024 Binance Trading Platform</span>
            <span className="hidden md:inline">•</span>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <span className="hidden md:inline">•</span>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <span className="hidden md:inline">•</span>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm text-gray-400">Powered by</span>
            <div className="flex items-center gap-1">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white rounded flex items-center justify-center">
                <span className="text-black font-bold text-xs">B</span>
              </div>
              <span className="font-bold text-white text-sm sm:text-base">Technology</span>
            </div>
          </div>
        </div>

        {/* Language & Currency Selector */}
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-800 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {/* Language Selector */}
          <div className="relative w-full sm:w-auto" ref={languageRef}>
            <button
              onClick={toggleLanguageDropdown}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all w-full sm:min-w-[140px] justify-between text-sm"
              aria-label="Select language"
            >
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                <span className="text-sm">{selectedLanguage.name}</span>
              </div>
              <svg 
                className={`w-4 h-4 transition-transform duration-200 ${isLanguageOpen ? 'rotate-180' : ''}`} 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </button>
            
            {/* Language Dropdown */}
            {isLanguageOpen && (
              <div className="absolute bottom-full left-0 right-0 sm:left-0 sm:right-auto mb-2 w-full sm:w-56 bg-gray-800 border border-gray-700 rounded-lg shadow-2xl overflow-hidden animate-fade-in z-50">
                <div className="max-h-64 overflow-y-auto">
                  {LANGUAGES.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageSelect(language)}
                      className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-700 transition-colors ${
                        selectedLanguage.code === language.code ? 'bg-gray-700 text-white' : 'text-gray-300'
                      }`}
                    >
                      <span className="text-xl">{language.flag}</span>
                      <span className="text-sm font-medium">{language.name}</span>
                      {selectedLanguage.code === language.code && (
                        <svg className="w-4 h-4 ml-auto text-green-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Currency Selector */}
          <div className="relative w-full sm:w-auto" ref={currencyRef}>
            <button
              onClick={toggleCurrencyDropdown}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all w-full sm:min-w-[120px] justify-between text-sm"
              aria-label="Select currency"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold">{selectedCurrency.symbol}</span>
                <span className="text-sm">{selectedCurrency.code}</span>
              </div>
              <svg 
                className={`w-4 h-4 transition-transform duration-200 ${isCurrencyOpen ? 'rotate-180' : ''}`} 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </button>
            
            {/* Currency Dropdown */}
            {isCurrencyOpen && (
              <div className="absolute bottom-full left-0 right-0 sm:left-0 sm:right-auto mb-2 w-full sm:w-56 bg-gray-800 border border-gray-700 rounded-lg shadow-2xl overflow-hidden animate-fade-in z-50">
                <div className="max-h-64 overflow-y-auto">
                  {CURRENCIES.map((currency) => (
                    <button
                      key={currency.code}
                      onClick={() => handleCurrencySelect(currency)}
                      className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-700 transition-colors ${
                        selectedCurrency.code === currency.code ? 'bg-gray-700 text-white' : 'text-gray-300'
                      }`}
                    >
                      <span className="text-lg font-bold">{currency.symbol}</span>
                      <div className="flex-1 text-left">
                        <div className="text-sm font-medium">{currency.code}</div>
                        <div className="text-xs text-gray-400">{currency.name}</div>
                      </div>
                      {selectedCurrency.code === currency.code && (
                        <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);

