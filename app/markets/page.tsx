'use client';

import { memo, useCallback, useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';

// Back Icon Component
const BackIcon = memo(() => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
));
BackIcon.displayName = 'BackIcon';

// Search Icon Component
const SearchIcon = memo(() => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
));
SearchIcon.displayName = 'SearchIcon';

// Close Icon Component
const CloseIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
));
CloseIcon.displayName = 'CloseIcon';

// Star Icon Component
const StarIcon = memo(({ filled = false }: { filled?: boolean }) => (
  <svg className="w-4 h-4" fill={filled ? '#fbbf24' : 'none'} stroke={filled ? '#fbbf24' : 'currentColor'} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
));
StarIcon.displayName = 'StarIcon';

// Sort Icon Component
const SortIcon = memo(() => (
  <svg className="w-3 h-3 ml-1 opacity-40" fill="currentColor" viewBox="0 0 24 24">
    <path d="M7 10l5 5 5-5z" />
  </svg>
));
SortIcon.displayName = 'SortIcon';

// Dropdown Icon Component
const DropdownIcon = memo(() => (
  <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 24 24">
    <path d="M7 10l5 5 5-5z" />
  </svg>
));
DropdownIcon.displayName = 'DropdownIcon';

// Grid View Icon Component
const GridViewIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
));
GridViewIcon.displayName = 'GridViewIcon';

// List View Icon Component
const ListViewIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
));
ListViewIcon.displayName = 'ListViewIcon';

// Trending Up Icon Component
const TrendingUpIcon = memo(() => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
));
TrendingUpIcon.displayName = 'TrendingUpIcon';

// Trending Down Icon Component
const TrendingDownIcon = memo(() => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
  </svg>
));
TrendingDownIcon.displayName = 'TrendingDownIcon';

// Fire Icon Component (for hot/trending)
const FireIcon = memo(() => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 23a7.5 7.5 0 005.4-12.815C17.4 8.64 14.5 6 13.5 4c-1 2-3 4-3 7 0 1.25.5 2.5 1.5 3.5-.5-.5-1-1-1-2 0-1 .5-2 .5-2s-2 1-2 4c0 1 .5 2 1 2.5A7.5 7.5 0 1012 23z" />
  </svg>
));
FireIcon.displayName = 'FireIcon';

// Chart Icon Component
const ChartIcon = memo(() => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
));
ChartIcon.displayName = 'ChartIcon';

// Mini Sparkline Chart Component
interface SparklineChartProps {
  data: number[];
  isPositive: boolean;
}

const SparklineChart = memo(({ data, isPositive }: SparklineChartProps) => {
  // Return empty SVG if no data (prevents hydration issues)
  if (!data || data.length === 0) {
    return (
      <svg width="60" height="24" className="inline-block">
        <line x1="0" y1="12" x2="60" y2="12" stroke="#e0e0e0" strokeWidth="1" opacity="0.3" />
      </svg>
    );
  }

  const color = isPositive ? '#0ecb81' : '#f6465d';
  const points = useMemo(() => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const width = 60;
    const height = 24;
    
    return data
      .map((value, index) => {
        const x = (index / (data.length - 1)) * width;
        const y = height - ((value - min) / range) * height;
        return `${x},${y}`;
      })
      .join(' ');
  }, [data]);

  return (
    <svg width="60" height="24" className="inline-block">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        points={points}
      />
    </svg>
  );
});
SparklineChart.displayName = 'SparklineChart';

// Crypto Item Interface
interface CryptoItem {
  id: string;
  symbol: string;
  pair: string;
  volume: string;
  price: string;
  previousPrice: string;
  change: number;
  isFavorite?: boolean;
  badge?: string;
  marketCap?: string;
  high24h?: string;
  low24h?: string;
  sparklineData?: number[];
}

// Crypto Row Component (List View)
interface CryptoRowProps {
  item: CryptoItem;
  onToggleFavorite: (id: string) => void;
  showChart?: boolean;
}

const CryptoRow = memo(({ item, onToggleFavorite, showChart = true }: CryptoRowProps) => {
  const handleFavoriteClick = useCallback(() => {
    onToggleFavorite(item.id);
  }, [item.id, onToggleFavorite]);

  const changeColor = item.change >= 0 ? 'bg-[#0ecb81] text-white' : 'bg-[#f6465d] text-white';
  const textColor = item.change >= 0 ? 'text-[#0ecb81]' : 'text-[#f6465d]';
  const changeSign = item.change >= 0 ? '+' : '';

  return (
    <div className="flex items-center justify-between py-3 px-4 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100 last:border-b-0">
      {/* Left: Coin Info */}
      <div className="flex items-center space-x-2 flex-1 min-w-0">
        <button
          onClick={handleFavoriteClick}
          className="flex-shrink-0 text-gray-400 hover:text-yellow-400 transition-colors p-1"
          aria-label={item.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <StarIcon filled={item.isFavorite} />
        </button>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-black text-sm">{item.symbol}</span>
            <span className="text-gray-500 text-xs">/ {item.pair}</span>
            {item.badge && (
              <span className="bg-[#0ecb81] text-white text-[10px] px-1.5 py-0.5 rounded font-medium">
                {item.badge}
              </span>
            )}
          </div>
          <span className="text-gray-400 text-xs mt-0.5">Vol {item.volume}</span>
        </div>
      </div>

      {/* Chart (Optional) */}
      {showChart && item.sparklineData && (
        <div className="hidden lg:flex items-center justify-center flex-shrink-0 px-4">
          <SparklineChart data={item.sparklineData} isPositive={item.change >= 0} />
        </div>
      )}

      {/* Middle: Price */}
      <div className="flex flex-col items-end flex-1 min-w-0 px-4">
        <span className="font-semibold text-black text-sm">${item.price}</span>
        {item.marketCap && (
          <span className="text-gray-400 text-xs mt-0.5">MC: {item.marketCap}</span>
        )}
      </div>

      {/* Right: Change */}
      <div className="flex-shrink-0">
        <div className={`${changeColor} px-3 py-1.5 rounded text-xs font-medium min-w-[70px] text-center`}>
          {changeSign}{item.change.toFixed(2)}%
        </div>
      </div>
    </div>
  );
});
CryptoRow.displayName = 'CryptoRow';

// Crypto Card Component (Grid View)
interface CryptoCardProps {
  item: CryptoItem;
  onToggleFavorite: (id: string) => void;
}

const CryptoCard = memo(({ item, onToggleFavorite }: CryptoCardProps) => {
  const handleFavoriteClick = useCallback(() => {
    onToggleFavorite(item.id);
  }, [item.id, onToggleFavorite]);

  const changeColor = item.change >= 0 ? 'text-[#0ecb81]' : 'text-[#f6465d]';
  const bgColor = item.change >= 0 ? 'bg-[#0ecb81]/10' : 'bg-[#f6465d]/10';
  const changeSign = item.change >= 0 ? '+' : '';

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-black text-lg">{item.symbol}</span>
          <span className="text-gray-400 text-sm">/{item.pair}</span>
        </div>
        <button
          onClick={handleFavoriteClick}
          className="text-gray-400 hover:text-yellow-400 transition-colors"
          aria-label={item.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <StarIcon filled={item.isFavorite} />
        </button>
      </div>

      {/* Chart */}
      {item.sparklineData && (
        <div className="mb-3 flex justify-center">
          <SparklineChart data={item.sparklineData} isPositive={item.change >= 0} />
        </div>
      )}

      {/* Price */}
      <div className="mb-2">
        <div className="text-2xl font-bold text-black">${item.price}</div>
        {item.marketCap && (
          <div className="text-xs text-gray-400 mt-1">MC: {item.marketCap}</div>
        )}
      </div>

      {/* Change */}
      <div className={`${bgColor} ${changeColor} px-3 py-2 rounded-lg text-sm font-semibold text-center`}>
        {changeSign}{item.change.toFixed(2)}%
      </div>

      {/* Additional Info */}
      <div className="mt-3 pt-3 border-t border-gray-100 space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-gray-500">24h Vol</span>
          <span className="text-black font-medium">{item.volume}</span>
        </div>
        {item.high24h && item.low24h && (
          <>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">24h High</span>
              <span className="text-black font-medium">${item.high24h}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">24h Low</span>
              <span className="text-black font-medium">${item.low24h}</span>
            </div>
          </>
        )}
      </div>

      {item.badge && (
        <div className="mt-3">
          <span className="bg-[#0ecb81] text-white text-xs px-2 py-1 rounded font-medium">
            {item.badge}
          </span>
        </div>
      )}
    </div>
  );
});
CryptoCard.displayName = 'CryptoCard';

// Helper function to generate sparkline data (deterministic for SSR)
const generateSparklineData = (basePrice: number, change: number, seed: number): number[] => {
  const data: number[] = [];
  const points = 20;
  const trend = change >= 0 ? 1 : -1;
  
  // Simple seeded random function for consistent SSR/client rendering
  const seededRandom = (s: number) => {
    const x = Math.sin(s) * 10000;
    return x - Math.floor(x);
  };
  
  for (let i = 0; i < points; i++) {
    const randomValue = seededRandom(seed + i);
    const variation = (randomValue - 0.5) * basePrice * 0.02;
    const trendEffect = (i / points) * basePrice * (change / 100);
    data.push(basePrice + variation + (trendEffect * trend));
  }
  return data;
};

// Main Markets Page Component
const MarketsPage = () => {
  const [activeTab, setActiveTab] = useState<'spot' | 'futures' | 'margin'>('spot');
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'coin' | 'price' | 'change' | 'volume'>('coin');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [itemsToShow, setItemsToShow] = useState(15);

  // Sample data - Enhanced with market cap, high/low, and sparklines
  const [cryptoData, setCryptoData] = useState<CryptoItem[]>([
    { id: '1', symbol: 'BTC', pair: 'USDT', volume: '278.02M', price: '103,353.21', previousPrice: '103,319.59', change: -3.94, isFavorite: false, marketCap: '2.04T', high24h: '105,234.56', low24h: '101,234.12', sparklineData: [] },
    { id: '2', symbol: 'ETH', pair: 'USDT', volume: '98.54M', price: '3,494.28', previousPrice: '3,493.16', change: -5.99, isFavorite: false, marketCap: '419.8B', high24h: '3,645.32', low24h: '3,401.23', sparklineData: [] },
    { id: '3', symbol: 'USDC', pair: 'USDT', volume: '371.77M', price: '1.0001', previousPrice: '0.99', change: 0.02, isFavorite: false, badge: '0 Fees', marketCap: '24.2B', high24h: '1.0012', low24h: '0.9989', sparklineData: [] },
    { id: '4', symbol: 'SOL', pair: 'USDT', volume: '139.37M', price: '160.40', previousPrice: '160.34', change: -8.45, isFavorite: false, marketCap: '78.5B', high24h: '172.45', low24h: '158.23', sparklineData: [] },
    { id: '5', symbol: 'BGB', pair: 'USDT', volume: '132.77M', price: '4.069', previousPrice: '4.06', change: -0.46, isFavorite: true, marketCap: '5.8B', high24h: '4.12', low24h: '4.01', sparklineData: [] },
    { id: '6', symbol: 'XRP', pair: 'USDT', volume: '99.44M', price: '2.2550', previousPrice: '2.25', change: -6.70, isFavorite: true, marketCap: '129.4B', high24h: '2.38', low24h: '2.19', sparklineData: [] },
    { id: '7', symbol: 'HYPE', pair: 'USDT', volume: '62.04M', price: '37.64', previousPrice: '37.62', change: -8.51, isFavorite: false, marketCap: '1.2B', high24h: '40.23', low24h: '36.45', sparklineData: [] },
    { id: '8', symbol: 'SUI', pair: 'USDT', volume: '51.89M', price: '2.0214', previousPrice: '2.02', change: -6.75, isFavorite: false, marketCap: '6.1B', high24h: '2.14', low24h: '1.98', sparklineData: [] },
    { id: '9', symbol: 'DOGE', pair: 'USDT', volume: '35.55M', price: '0.16226', previousPrice: '0.16', change: -6.88, isFavorite: true, marketCap: '23.8B', high24h: '0.17', low24h: '0.155', sparklineData: [] },
    { id: '10', symbol: 'ADA', pair: 'USDT', volume: '28.32M', price: '0.8945', previousPrice: '0.89', change: -4.23, isFavorite: false, marketCap: '31.4B', high24h: '0.92', low24h: '0.87', sparklineData: [] },
    { id: '11', symbol: 'AVAX', pair: 'USDT', volume: '24.18M', price: '35.67', previousPrice: '35.45', change: 0.62, isFavorite: false, marketCap: '14.7B', high24h: '36.12', low24h: '34.89', sparklineData: [] },
    { id: '12', symbol: 'TRX', pair: 'USDT', volume: '22.45M', price: '0.2456', previousPrice: '0.24', change: 2.13, isFavorite: false, marketCap: '21.3B', high24h: '0.25', low24h: '0.238', sparklineData: [] },
    { id: '13', symbol: 'LINK', pair: 'USDT', volume: '19.87M', price: '23.45', previousPrice: '23.23', change: 0.95, isFavorite: false, marketCap: '14.9B', high24h: '23.89', low24h: '22.98', sparklineData: [] },
    { id: '14', symbol: 'MATIC', pair: 'USDT', volume: '18.56M', price: '0.9123', previousPrice: '0.91', change: 0.25, isFavorite: true, marketCap: '9.2B', high24h: '0.93', low24h: '0.89', sparklineData: [] },
    { id: '15', symbol: 'DOT', pair: 'USDT', volume: '17.23M', price: '7.234', previousPrice: '7.19', change: 0.61, isFavorite: false, marketCap: '11.5B', high24h: '7.45', low24h: '7.01', sparklineData: [] },
    { id: '16', symbol: 'UNI', pair: 'USDT', volume: '16.45M', price: '12.345', previousPrice: '12.12', change: 1.86, isFavorite: false, marketCap: '7.4B', high24h: '12.67', low24h: '11.98', sparklineData: [] },
    { id: '17', symbol: 'ATOM', pair: 'USDT', volume: '15.23M', price: '9.876', previousPrice: '9.75', change: 1.29, isFavorite: false, marketCap: '3.9B', high24h: '10.12', low24h: '9.56', sparklineData: [] },
    { id: '18', symbol: 'LTC', pair: 'USDT', volume: '14.56M', price: '98.234', previousPrice: '97.45', change: 0.80, isFavorite: false, marketCap: '7.3B', high24h: '99.45', low24h: '96.78', sparklineData: [] },
    { id: '19', symbol: 'APT', pair: 'USDT', volume: '13.67M', price: '8.765', previousPrice: '8.56', change: 2.39, isFavorite: false, marketCap: '4.2B', high24h: '9.01', low24h: '8.45', sparklineData: [] },
    { id: '20', symbol: 'ARB', pair: 'USDT', volume: '12.89M', price: '1.234', previousPrice: '1.19', change: 3.70, isFavorite: false, marketCap: '1.8B', high24h: '1.28', low24h: '1.18', sparklineData: [] },
  ]);

  // Generate sparkline data after mount to avoid hydration mismatch
  useEffect(() => {
    setCryptoData(prevData => prevData.map((item, index) => {
      if (!item.sparklineData || item.sparklineData.length === 0) {
        const basePrice = parseFloat(item.price.replace(/,/g, ''));
        return {
          ...item,
          sparklineData: generateSparklineData(basePrice, item.change, parseInt(item.id))
        };
      }
      return item;
    }));
  }, []);

  const filters = useMemo(() => ['All', 'Favorites', 'Gainers', 'Losers', 'High Volume', 'New', 'DeFi', 'AI', 'Meme', 'Layer 1'], []);

  const handleTabChange = useCallback((tab: 'spot' | 'futures' | 'margin') => {
    setActiveTab(tab);
  }, []);

  const handleFilterChange = useCallback((filter: string) => {
    setActiveFilter(filter);
  }, []);

  const handleToggleFavorite = useCallback((id: string) => {
    setCryptoData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  }, []);

  const handleSort = useCallback((column: 'coin' | 'price' | 'change' | 'volume') => {
    if (sortBy === column) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('desc');
    }
  }, [sortBy]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  const toggleViewMode = useCallback(() => {
    setViewMode(prev => prev === 'list' ? 'grid' : 'list');
  }, []);

  const loadMoreItems = useCallback(() => {
    setItemsToShow(prev => prev + 10);
  }, []);

  // Filter and sort crypto data
  const processedCryptoData = useMemo(() => {
    let filtered = [...cryptoData];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.symbol.toLowerCase().includes(query) ||
          item.pair.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    switch (activeFilter) {
      case 'Favorites':
        filtered = filtered.filter(item => item.isFavorite);
        break;
      case 'Gainers':
        filtered = filtered.filter(item => item.change > 0);
        break;
      case 'Losers':
        filtered = filtered.filter(item => item.change < 0);
        break;
      case 'High Volume':
        filtered = filtered.sort((a, b) => {
          const volA = parseFloat(a.volume.replace(/[M$]/g, ''));
          const volB = parseFloat(b.volume.replace(/[M$]/g, ''));
          return volB - volA;
        });
        break;
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'coin':
          comparison = a.symbol.localeCompare(b.symbol);
          break;
        case 'price':
          const priceA = parseFloat(a.price.replace(/,/g, ''));
          const priceB = parseFloat(b.price.replace(/,/g, ''));
          comparison = priceA - priceB;
          break;
        case 'change':
          comparison = a.change - b.change;
          break;
        case 'volume':
          const volA = parseFloat(a.volume.replace(/[M$]/g, ''));
          const volB = parseFloat(b.volume.replace(/[M$]/g, ''));
          comparison = volA - volB;
          break;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [cryptoData, searchQuery, activeFilter, sortBy, sortDirection]);

  // Calculate market stats
  const marketStats = useMemo(() => {
    const totalVolume = cryptoData.reduce((sum, item) => {
      const vol = parseFloat(item.volume.replace(/[M$]/g, ''));
      return sum + vol;
    }, 0);

    const gainers = cryptoData.filter(item => item.change > 0).length;
    const losers = cryptoData.filter(item => item.change < 0).length;
    const avgChange = cryptoData.reduce((sum, item) => sum + item.change, 0) / cryptoData.length;

    return {
      totalVolume: `$${totalVolume.toFixed(2)}M`,
      gainers,
      losers,
      avgChange: avgChange.toFixed(2),
    };
  }, [cryptoData]);

  // Paginated data
  const displayedCryptoData = useMemo(() => {
    return processedCryptoData.slice(0, itemsToShow);
  }, [processedCryptoData, itemsToShow]);

  return (
    <div className="min-h-screen bg-white">
      {/* Search and Controls Bar */}
      <div className="sticky top-[56px] z-40 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-3 sm:px-4 py-3 gap-2 sm:gap-0">
          {/* Back Button */}
          <Link
            href="/"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
            aria-label="Go back to home"
          >
            <BackIcon />
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-2 sm:mx-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 sm:pl-4 pointer-events-none">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Search coins, markets..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 bg-gray-100 border-0 rounded-lg sm:rounded-xl text-black placeholder-gray-400 focus:ring-2 focus:ring-black focus:bg-white transition-all outline-none text-sm"
                aria-label="Search markets"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-4 text-gray-400 hover:text-black transition-colors"
                  aria-label="Clear search"
                >
                  <CloseIcon />
                </button>
              )}
            </div>
          </div>

          {/* Logo */}
          <Link href="/" className="flex items-center cursor-pointer group flex-shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-black rounded-lg flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg">
              B
            </div>
          </Link>
        </div>
      </div>

      {/* Market Stats Overview */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <div className="flex items-center space-x-2 mb-1">
                <ChartIcon />
                <span className="text-xs text-gray-500">24h Volume</span>
              </div>
              <div className="text-lg font-bold text-black">{marketStats.totalVolume}</div>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <div className="flex items-center space-x-2 mb-1">
                <TrendingUpIcon />
                <span className="text-xs text-gray-500">Gainers</span>
              </div>
              <div className="text-lg font-bold text-[#0ecb81]">{marketStats.gainers} Coins</div>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <div className="flex items-center space-x-2 mb-1">
                <TrendingDownIcon />
                <span className="text-xs text-gray-500">Losers</span>
              </div>
              <div className="text-lg font-bold text-[#f6465d]">{marketStats.losers} Coins</div>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <div className="flex items-center space-x-2 mb-1">
                <FireIcon />
                <span className="text-xs text-gray-500">Avg Change</span>
              </div>
              <div className={`text-lg font-bold ${parseFloat(marketStats.avgChange) >= 0 ? 'text-[#0ecb81]' : 'text-[#f6465d]'}`}>
                {parseFloat(marketStats.avgChange) >= 0 ? '+' : ''}{marketStats.avgChange}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Container */}
      <div className="max-w-7xl mx-auto">
        {/* Top Tab Navigation */}
        <div className="flex items-center justify-between border-b border-gray-200 px-4">
          <div className="flex items-center">
            <button
              onClick={() => handleTabChange('spot')}
              className={`px-6 py-4 text-sm font-medium transition-colors relative ${
                activeTab === 'spot' ? 'text-black' : 'text-gray-500 hover:text-black'
              }`}
            >
              Spot
              {activeTab === 'spot' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
              )}
            </button>
            <button
              onClick={() => handleTabChange('futures')}
              className={`px-6 py-4 text-sm font-medium transition-colors relative ${
                activeTab === 'futures' ? 'text-black' : 'text-gray-500 hover:text-black'
              }`}
            >
              Futures
              {activeTab === 'futures' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
              )}
            </button>
            <button
              onClick={() => handleTabChange('margin')}
              className={`px-6 py-4 text-sm font-medium transition-colors relative ${
                activeTab === 'margin' ? 'text-black' : 'text-gray-500 hover:text-black'
              }`}
            >
              Margin
              {activeTab === 'margin' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
              )}
            </button>
          </div>

          {/* View Toggle */}
          <button
            onClick={toggleViewMode}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label={`Switch to ${viewMode === 'list' ? 'grid' : 'list'} view`}
          >
            {viewMode === 'list' ? <GridViewIcon /> : <ListViewIcon />}
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-2 px-4 py-4 overflow-x-auto scrollbar-hide border-b border-gray-100">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterChange(filter)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                activeFilter === filter
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Table Header - Only show in list view */}
        {viewMode === 'list' && (
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
            <button
              onClick={() => handleSort('coin')}
              className={`flex items-center text-xs font-medium transition-colors flex-1 ${
                sortBy === 'coin' ? 'text-black' : 'text-gray-500 hover:text-black'
              }`}
            >
              Coin/Volume
              <SortIcon />
            </button>
            <div className="hidden lg:flex items-center flex-shrink-0 px-4">
              <span className="text-xs font-medium text-gray-500">Chart</span>
            </div>
            <button
              onClick={() => handleSort('price')}
              className={`flex items-center justify-end text-xs font-medium transition-colors flex-1 px-4 ${
                sortBy === 'price' ? 'text-black' : 'text-gray-500 hover:text-black'
              }`}
            >
              Price/Market Cap
              <SortIcon />
            </button>
            <button
              onClick={() => handleSort('change')}
              className={`flex items-center justify-end text-xs font-medium transition-colors flex-shrink-0 min-w-[90px] ${
                sortBy === 'change' ? 'text-black' : 'text-gray-500 hover:text-black'
              }`}
            >
              24h Change
              <SortIcon />
            </button>
          </div>
        )}

        {/* Crypto List/Grid */}
        <div className="bg-white">
          {displayedCryptoData.length > 0 ? (
            viewMode === 'list' ? (
              // List View
              <div>
                {displayedCryptoData.map((item) => (
                  <CryptoRow key={item.id} item={item} onToggleFavorite={handleToggleFavorite} showChart={true} />
                ))}
              </div>
            ) : (
              // Grid View
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
                {displayedCryptoData.map((item) => (
                  <CryptoCard key={item.id} item={item} onToggleFavorite={handleToggleFavorite} />
                ))}
              </div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <div className="text-gray-400 mb-2">
                <SearchIcon />
              </div>
              <p className="text-gray-500 text-sm">No results found for "{searchQuery}"</p>
              <button
                onClick={clearSearch}
                className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

        {/* Load More Button */}
        {displayedCryptoData.length < processedCryptoData.length && (
          <div className="flex justify-center py-8 px-4">
            <button
              onClick={loadMoreItems}
              className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all font-medium shadow-md hover:shadow-lg"
            >
              Load More ({processedCryptoData.length - displayedCryptoData.length} remaining)
            </button>
          </div>
        )}

        {/* Results Summary */}
        <div className="text-center py-6 text-sm text-gray-500 border-t border-gray-100">
          Showing {displayedCryptoData.length} of {processedCryptoData.length} results
        </div>
      </div>
    </div>
  );
};

export default memo(MarketsPage);


