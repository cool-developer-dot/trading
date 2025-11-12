'use client';

import { memo, useCallback, useMemo, useState } from 'react';
import Link from 'next/link';

// Icon Components - Optimized
const SearchIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
));
SearchIcon.displayName = 'SearchIcon';

const GridIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
));
GridIcon.displayName = 'GridIcon';

const ListIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
));
ListIcon.displayName = 'ListIcon';

const StarFilledIcon = memo(() => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
));
StarFilledIcon.displayName = 'StarFilledIcon';

const ChartIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
  </svg>
));
ChartIcon.displayName = 'ChartIcon';

const TradeIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>
));
TradeIcon.displayName = 'TradeIcon';

const FilterIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
  </svg>
));
FilterIcon.displayName = 'FilterIcon';

const EmptyStarIcon = memo(() => (
  <svg className="w-24 h-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
));
EmptyStarIcon.displayName = 'EmptyStarIcon';

// Type definitions
interface CryptoFavorite {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: string;
  marketCap: string;
  logo: string;
}

// Mock data - In production, this would come from an API
const mockFavorites: CryptoFavorite[] = [
  {
    id: '1',
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 67234.50,
    change24h: 2.45,
    volume24h: '$28.5B',
    marketCap: '$1.32T',
    logo: '₿',
  },
  {
    id: '2',
    symbol: 'ETH',
    name: 'Ethereum',
    price: 3456.78,
    change24h: -1.23,
    volume24h: '$15.2B',
    marketCap: '$415.6B',
    logo: 'Ξ',
  },
  {
    id: '3',
    symbol: 'BNB',
    name: 'Binance Coin',
    price: 598.32,
    change24h: 5.67,
    volume24h: '$2.1B',
    marketCap: '$89.3B',
    logo: 'Ⓑ',
  },
  {
    id: '4',
    symbol: 'SOL',
    name: 'Solana',
    price: 145.89,
    change24h: 8.92,
    volume24h: '$3.8B',
    marketCap: '$65.2B',
    logo: '◎',
  },
  {
    id: '5',
    symbol: 'XRP',
    name: 'Ripple',
    price: 0.5234,
    change24h: -2.45,
    volume24h: '$1.2B',
    marketCap: '$29.5B',
    logo: '✕',
  },
  {
    id: '6',
    symbol: 'ADA',
    name: 'Cardano',
    price: 0.4567,
    change24h: 3.21,
    volume24h: '$890M',
    marketCap: '$16.1B',
    logo: '₳',
  },
];

// Favorite Card Component - Grid View
interface FavoriteCardProps {
  favorite: CryptoFavorite;
  onRemove: (id: string) => void;
}

const FavoriteCardGrid = memo(({ favorite, onRemove }: FavoriteCardProps) => {
  const isPositive = favorite.change24h > 0;
  
  return (
    <div className="group relative bg-white rounded-2xl border border-gray-200 p-5 hover:border-black hover:shadow-2xl transition-all duration-500 overflow-hidden animate-fade-in">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-transparent to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
              {favorite.logo}
            </div>
            <div>
              <h3 className="text-lg font-bold text-black">{favorite.symbol}</h3>
              <p className="text-xs text-gray-500">{favorite.name}</p>
            </div>
          </div>
          <button
            onClick={() => onRemove(favorite.id)}
            className="text-yellow-500 hover:text-gray-400 transition-all duration-300 hover:scale-110 active:scale-95 hover:rotate-12"
            aria-label="Remove from favorites"
          >
            <StarFilledIcon />
          </button>
        </div>

        {/* Price */}
        <div className="mb-3">
          <p className="text-2xl font-bold text-black group-hover:scale-105 transition-transform duration-300">
            ${favorite.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <div className={`inline-flex items-center px-2 py-1 rounded-lg text-sm font-semibold mt-2 ${
            isPositive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
          }`}>
            {isPositive ? '↑' : '↓'} {Math.abs(favorite.change24h).toFixed(2)}%
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-2 mb-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Volume 24h:</span>
            <span className="font-semibold text-black">{favorite.volume24h}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Market Cap:</span>
            <span className="font-semibold text-black">{favorite.marketCap}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            href={`/trade?pair=${favorite.symbol}USDT`}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <TradeIcon />
            <span>Trade</span>
          </Link>
          <Link
            href={`/markets?symbol=${favorite.symbol}`}
            className="flex items-center justify-center px-4 py-2.5 border-2 border-black text-black rounded-xl font-semibold hover:bg-black hover:text-white transition-all duration-300 hover:scale-105 active:scale-95"
            aria-label="View chart"
          >
            <ChartIcon />
          </Link>
        </div>
      </div>
    </div>
  );
});
FavoriteCardGrid.displayName = 'FavoriteCardGrid';

// Favorite Card Component - List View
const FavoriteCardList = memo(({ favorite, onRemove }: FavoriteCardProps) => {
  const isPositive = favorite.change24h > 0;
  
  return (
    <div className="group relative bg-white rounded-xl border border-gray-200 p-4 hover:border-black hover:shadow-xl transition-all duration-300 overflow-hidden animate-fade-in">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-transparent to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10 flex items-center justify-between">
        {/* Left: Coin Info */}
        <div className="flex items-center space-x-4 flex-1">
          <button
            onClick={() => onRemove(favorite.id)}
            className="text-yellow-500 hover:text-gray-400 transition-all duration-300 hover:scale-110 active:scale-95"
            aria-label="Remove from favorites"
          >
            <StarFilledIcon />
          </button>
          <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white text-xl font-bold shadow-md group-hover:scale-110 transition-transform duration-300">
            {favorite.logo}
          </div>
          <div>
            <h3 className="text-base font-bold text-black">{favorite.symbol}</h3>
            <p className="text-xs text-gray-500">{favorite.name}</p>
          </div>
        </div>

        {/* Middle: Stats */}
        <div className="hidden md:flex items-center space-x-8 flex-1">
          <div className="text-right">
            <p className="text-sm font-bold text-black">
              ${favorite.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-xs text-gray-500">Price</p>
          </div>
          <div className="text-right">
            <p className={`text-sm font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? '↑' : '↓'} {Math.abs(favorite.change24h).toFixed(2)}%
            </p>
            <p className="text-xs text-gray-500">24h Change</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-black">{favorite.volume24h}</p>
            <p className="text-xs text-gray-500">Volume</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-black">{favorite.marketCap}</p>
            <p className="text-xs text-gray-500">Market Cap</p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <Link
            href={`/trade?pair=${favorite.symbol}USDT`}
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg font-semibold text-sm hover:bg-gray-800 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <TradeIcon />
            <span>Trade</span>
          </Link>
          <Link
            href={`/markets?symbol=${favorite.symbol}`}
            className="flex items-center justify-center p-2 border-2 border-black text-black rounded-lg hover:bg-black hover:text-white transition-all duration-300 hover:scale-105 active:scale-95"
            aria-label="View chart"
          >
            <ChartIcon />
          </Link>
        </div>
      </div>
    </div>
  );
});
FavoriteCardList.displayName = 'FavoriteCardList';

// Empty State Component
const EmptyState = memo(() => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
    <div className="animate-float mb-6">
      <EmptyStarIcon />
    </div>
    <h2 className="text-2xl font-bold text-black mb-2">No Favourites Yet</h2>
    <p className="text-gray-500 text-center max-w-md mb-8">
      Start building your watchlist by adding your favorite cryptocurrencies. Track prices and stay updated with market trends.
    </p>
    <Link
      href="/markets"
      className="px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
    >
      Explore Markets
    </Link>
  </div>
));
EmptyState.displayName = 'EmptyState';

// Main Favourites Page Component
const FavouritesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<CryptoFavorite[]>(mockFavorites);
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'change'>('name');

  // Filter favorites based on search query
  const filteredFavorites = useMemo(() => {
    let filtered = favorites.filter(
      (fav) =>
        fav.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fav.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort favorites
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return b.price - a.price;
        case 'change':
          return b.change24h - a.change24h;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [favorites, searchQuery, sortBy]);

  // Remove favorite handler
  const handleRemoveFavorite = useCallback((id: string) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== id));
  }, []);

  // Toggle view mode
  const toggleViewMode = useCallback(() => {
    setViewMode((prev) => (prev === 'grid' ? 'list' : 'grid'));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8 animate-slide-down">
          <h1 className="text-4xl font-bold text-black mb-2">My Favourites</h1>
          <p className="text-gray-600">Track and manage your favorite cryptocurrencies</p>
        </div>

        {/* Controls Bar */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 animate-slide-up">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search favorites..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-black placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-black transition-all duration-300 outline-none hover:border-gray-300"
              aria-label="Search favorites"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'change')}
              className="w-full sm:w-auto pl-4 pr-10 py-3 bg-white border border-gray-200 rounded-xl text-black focus:ring-2 focus:ring-black focus:border-black transition-all duration-300 outline-none appearance-none cursor-pointer hover:border-gray-300 font-medium"
              aria-label="Sort favorites"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="change">Sort by Change</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* View Toggle */}
          <button
            onClick={toggleViewMode}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-black font-medium hover:border-black hover:bg-black hover:text-white transition-all duration-300 hover:scale-105 active:scale-95"
            aria-label={`Switch to ${viewMode === 'grid' ? 'list' : 'grid'} view`}
          >
            {viewMode === 'grid' ? <ListIcon /> : <GridIcon />}
            <span className="hidden sm:inline">{viewMode === 'grid' ? 'List' : 'Grid'}</span>
          </button>
        </div>

        {/* Stats Bar */}
        {favorites.length > 0 && (
          <div className="mb-6 p-4 bg-white border border-gray-200 rounded-xl flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-gray-600">
                <span className="font-bold text-black">{filteredFavorites.length}</span> {filteredFavorites.length === 1 ? 'Favourite' : 'Favourites'}
                {searchQuery && ' found'}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        )}

        {/* Favorites Grid/List */}
        {filteredFavorites.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFavorites.map((favorite) => (
                <FavoriteCardGrid
                  key={favorite.id}
                  favorite={favorite}
                  onRemove={handleRemoveFavorite}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFavorites.map((favorite) => (
                <FavoriteCardList
                  key={favorite.id}
                  favorite={favorite}
                  onRemove={handleRemoveFavorite}
                />
              ))}
            </div>
          )
        ) : searchQuery ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] animate-fade-in">
            <SearchIcon />
            <h2 className="text-xl font-bold text-black mt-4 mb-2">No Results Found</h2>
            <p className="text-gray-500 text-center">
              No favorites match "{searchQuery}"
            </p>
          </div>
        ) : (
          <EmptyState />
        )}
      </main>
    </div>
  );
};

export default memo(FavouritesPage);

