'use client';

import { memo, useState, useCallback, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: 'Markets' | 'Pages' | 'Blog' | 'Help' | 'Trading';
  url: string;
  icon?: string;
}

// Sample search data - in real app, this would come from API/database
const searchData: SearchResult[] = [
  // Markets
  { id: '1', title: 'Bitcoin (BTC)', description: 'Trade Bitcoin with USDT', category: 'Markets', url: '/markets', icon: '₿' },
  { id: '2', title: 'Ethereum (ETH)', description: 'Trade Ethereum with USDT', category: 'Markets', url: '/markets', icon: 'Ξ' },
  { id: '3', title: 'BNB', description: 'Binance Coin trading', category: 'Markets', url: '/markets', icon: '◆' },
  { id: '4', title: 'Cardano (ADA)', description: 'Trade Cardano', category: 'Markets', url: '/markets', icon: '₳' },
  { id: '5', title: 'Solana (SOL)', description: 'Trade Solana', category: 'Markets', url: '/markets', icon: '◎' },
  
  // Pages
  { id: '6', title: 'Trade', description: 'Start trading cryptocurrencies', category: 'Pages', url: '/trade' },
  { id: '7', title: 'Markets', description: 'View all cryptocurrency markets', category: 'Pages', url: '/markets' },
  { id: '8', title: 'Portfolio', description: 'Manage your portfolio', category: 'Pages', url: '/portfolio' },
  { id: '9', title: 'Favourites', description: 'Your favourite trading pairs', category: 'Pages', url: '/favourites' },
  { id: '10', title: 'Blog', description: 'Crypto news and insights', category: 'Pages', url: '/blog' },
  
  // Trading
  { id: '11', title: 'Spot Trading', description: 'Trade spot markets', category: 'Trading', url: '/trade' },
  { id: '12', title: 'Margin Trading', description: 'Trade with leverage', category: 'Trading', url: '/trade' },
  { id: '13', title: 'Convert', description: 'Convert between cryptocurrencies', category: 'Trading', url: '/assets/convert' },
  { id: '14', title: 'Earn', description: 'Earn rewards on your crypto', category: 'Trading', url: '/assets/earn' },
  
  // Blog
  { id: '15', title: 'Bitcoin Halving Guide', description: 'Understanding Bitcoin halving events', category: 'Blog', url: '/blog/understanding-bitcoin-halving' },
  { id: '16', title: 'Risk Management', description: 'Trading risk management strategies', category: 'Blog', url: '/blog/risk-management-strategies-crypto' },
  { id: '17', title: 'DeFi 2.0', description: 'The evolution of decentralized finance', category: 'Blog', url: '/blog/defi-2-evolution' },
  { id: '18', title: 'NFT Trends', description: 'Latest NFT market trends', category: 'Blog', url: '/blog/nft-market-trends-2024' },
  
  // Help
  { id: '19', title: 'How to deposit funds', description: 'Learn how to deposit crypto', category: 'Help', url: '/help-center' },
  { id: '20', title: 'Enable 2FA', description: 'Set up two-factor authentication', category: 'Help', url: '/help-center' },
  { id: '21', title: 'Verify account', description: 'Complete KYC verification', category: 'Help', url: '/help-center' },
  { id: '22', title: 'Trading fees', description: 'Understand our fee structure', category: 'Help', url: '/help-center' },
  { id: '23', title: 'Contact Support', description: 'Get help from our team', category: 'Help', url: '/contact' },
  { id: '24', title: 'API Documentation', description: 'Developer API docs', category: 'Help', url: '/api-docs' },
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = memo(({ isOpen, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  // Filter results based on query
  const filteredResults = useMemo(() => {
    if (!query.trim()) return searchData.slice(0, 8); // Show popular results when empty
    
    const lowerQuery = query.toLowerCase();
    return searchData.filter(item =>
      item.title.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery) ||
      item.category.toLowerCase().includes(lowerQuery)
    ).slice(0, 10);
  }, [query]);

  // Group results by category
  const groupedResults = useMemo(() => {
    const groups: { [key: string]: SearchResult[] } = {};
    filteredResults.forEach(result => {
      if (!groups[result.category]) {
        groups[result.category] = [];
      }
      groups[result.category].push(result);
    });
    return groups;
  }, [filteredResults]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => (prev + 1) % filteredResults.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => (prev - 1 + filteredResults.length) % filteredResults.length);
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredResults[selectedIndex]) {
            handleResultClick(filteredResults[selectedIndex]);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredResults, onClose]);

  // Reset on open/close
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const handleResultClick = useCallback((result: SearchResult) => {
    router.push(result.url);
    onClose();
  }, [router, onClose]);

  const getCategoryIcon = useCallback((category: string) => {
    switch (category) {
      case 'Markets':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        );
      case 'Pages':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'Blog':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'Help':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'Trading':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        );
      default:
        return null;
    }
  }, []);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4 pointer-events-none">
        <div
          className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl pointer-events-auto animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Input */}
          <div className="p-6 border-b border-zinc-800">
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search markets, pages, blog posts..."
                className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all text-lg"
                autoFocus
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Quick Tips */}
            <div className="flex items-center gap-4 mt-4 text-xs text-zinc-500">
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-zinc-800 rounded border border-zinc-700">↑↓</kbd>
                Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-zinc-800 rounded border border-zinc-700">Enter</kbd>
                Select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-zinc-800 rounded border border-zinc-700">Esc</kbd>
                Close
              </span>
            </div>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto p-4">
            {filteredResults.length > 0 ? (
              <div className="space-y-6">
                {Object.entries(groupedResults).map(([category, results]) => (
                  <div key={category}>
                    <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3 px-2">
                      {category}
                    </h3>
                    <div className="space-y-1">
                      {results.map((result, idx) => {
                        const globalIndex = filteredResults.indexOf(result);
                        const isSelected = globalIndex === selectedIndex;
                        
                        return (
                          <button
                            key={result.id}
                            onClick={() => handleResultClick(result)}
                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                            className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-200 text-left ${
                              isSelected
                                ? 'bg-yellow-500 text-black'
                                : 'hover:bg-zinc-800 text-white'
                            }`}
                          >
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              isSelected ? 'bg-black/20' : 'bg-zinc-800'
                            }`}>
                              {result.icon ? (
                                <span className="text-xl">{result.icon}</span>
                              ) : (
                                <span className={isSelected ? 'text-black' : 'text-yellow-500'}>
                                  {getCategoryIcon(result.category)}
                                </span>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className={`font-semibold mb-1 truncate ${
                                isSelected ? 'text-black' : 'text-white'
                              }`}>
                                {result.title}
                              </div>
                              <div className={`text-sm truncate ${
                                isSelected ? 'text-black/70' : 'text-zinc-400'
                              }`}>
                                {result.description}
                              </div>
                            </div>
                            {isSelected && (
                              <svg className="w-5 h-5 text-black flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-zinc-800 rounded-full mb-4">
                  <svg className="w-8 h-8 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-2">No results found</h3>
                <p className="text-zinc-500 text-sm">Try searching for markets, pages, or help articles</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-zinc-800">
            <div className="flex items-center justify-between text-xs text-zinc-500">
              <span>Search across markets, blog, and help center</span>
              <Link
                href="/help-center"
                className="text-yellow-500 hover:text-yellow-400 transition-colors"
                onClick={onClose}
              >
                View all help articles →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

SearchModal.displayName = 'SearchModal';

export default SearchModal;

