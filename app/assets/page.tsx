'use client';

import { memo, useCallback, useMemo, useState, useEffect } from 'react';
import Link from 'next/link';

// Icon Components
const WalletIcon = memo(() => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
));
WalletIcon.displayName = 'WalletIcon';

const SearchIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
));
SearchIcon.displayName = 'SearchIcon';

const DepositIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m0 0l-4-4m4 4l4-4" />
  </svg>
));
DepositIcon.displayName = 'DepositIcon';

const WithdrawIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20V4m0 0l4 4m-4-4l-4 4" />
  </svg>
));
WithdrawIcon.displayName = 'WithdrawIcon';

const TradeIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>
));
TradeIcon.displayName = 'TradeIcon';

const EyeIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
));
EyeIcon.displayName = 'EyeIcon';

const EyeOffIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
));
EyeOffIcon.displayName = 'EyeOffIcon';

const FilterIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
  </svg>
));
FilterIcon.displayName = 'FilterIcon';

const ChartIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
));
ChartIcon.displayName = 'ChartIcon';

const HistoryIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
));
HistoryIcon.displayName = 'HistoryIcon';

const RefreshIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
));
RefreshIcon.displayName = 'RefreshIcon';

// Types
interface Asset {
  id: string;
  name: string;
  symbol: string;
  balance: number;
  available: number;
  locked: number;
  usdValue: number;
  btcValue: number;
  change24h: number;
  icon: string;
}

// Mock Data
const MOCK_ASSETS: Asset[] = [
  { id: '1', name: 'Bitcoin', symbol: 'BTC', balance: 0.45823, available: 0.45823, locked: 0, usdValue: 19234.56, btcValue: 0.45823, change24h: 2.34, icon: '₿' },
  { id: '2', name: 'Ethereum', symbol: 'ETH', balance: 5.234, available: 5.234, locked: 0, usdValue: 9876.54, btcValue: 0.23456, change24h: -1.23, icon: 'Ξ' },
  { id: '3', name: 'Binance Coin', symbol: 'BNB', balance: 12.45, available: 12.45, locked: 0, usdValue: 3456.78, btcValue: 0.08234, change24h: 3.45, icon: '◈' },
  { id: '4', name: 'Cardano', symbol: 'ADA', balance: 1234.56, available: 1234.56, locked: 0, usdValue: 456.78, btcValue: 0.01087, change24h: 5.67, icon: '₳' },
  { id: '5', name: 'Solana', symbol: 'SOL', balance: 23.45, available: 23.45, locked: 0, usdValue: 2345.67, btcValue: 0.05589, change24h: -2.34, icon: '◎' },
  { id: '6', name: 'Ripple', symbol: 'XRP', balance: 2345.67, available: 2345.67, locked: 0, usdValue: 1234.56, btcValue: 0.02938, change24h: 1.23, icon: '✕' },
  { id: '7', name: 'Polkadot', symbol: 'DOT', balance: 234.56, available: 234.56, locked: 0, usdValue: 1456.78, btcValue: 0.03467, change24h: 4.56, icon: '●' },
  { id: '8', name: 'Dogecoin', symbol: 'DOGE', balance: 12345.67, available: 12345.67, locked: 0, usdValue: 987.65, btcValue: 0.02351, change24h: -3.45, icon: 'Ð' },
  { id: '9', name: 'USDT', symbol: 'USDT', balance: 5000, available: 5000, locked: 0, usdValue: 5000, btcValue: 0.11901, change24h: 0.01, icon: '₮' },
  { id: '10', name: 'USDC', symbol: 'USDC', balance: 3000, available: 3000, locked: 0, usdValue: 3000, btcValue: 0.07141, change24h: -0.01, icon: '$' },
];

type SortField = 'name' | 'balance' | 'usdValue' | 'change24h';
type SortOrder = 'asc' | 'desc';

const AssetsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hideSmallBalances, setHideSmallBalances] = useState(false);
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'crypto' | 'fiat'>('all');
  const [isClient, setIsClient] = useState(false);
  const [assets, setAssets] = useState<Asset[]>(MOCK_ASSETS);
  const [sortField, setSortField] = useState<SortField>('usdValue');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Initialize client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAssets(prevAssets =>
        prevAssets.map(asset => {
          const priceChange = (Math.random() - 0.5) * 2; // -1% to +1%
          const newChange24h = asset.change24h + priceChange * 0.1;
          const changeMultiplier = 1 + (priceChange / 100);
          const newUsdValue = asset.usdValue * changeMultiplier;
          const newBtcValue = asset.btcValue * changeMultiplier;

          return {
            ...asset,
            usdValue: newUsdValue,
            btcValue: newBtcValue,
            change24h: newChange24h,
          };
        })
      );
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Calculate totals from live assets
  const totalBalance = useMemo(() => {
    return assets.reduce((sum, asset) => sum + asset.usdValue, 0);
  }, [assets]);

  const totalBTCValue = useMemo(() => {
    return assets.reduce((sum, asset) => sum + asset.btcValue, 0);
  }, [assets]);

  const total24hChange = useMemo(() => {
    if (!isClient || assets.length === 0) return 0;
    const totalPrevValue = assets.reduce((sum, asset) => {
      const prevValue = asset.usdValue / (1 + asset.change24h / 100);
      return sum + prevValue;
    }, 0);
    return ((totalBalance - totalPrevValue) / totalPrevValue) * 100;
  }, [assets, totalBalance, isClient]);

  // Filter and sort assets
  const filteredAssets = useMemo(() => {
    let filtered = [...assets];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        asset =>
          asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          asset.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Small balance filter
    if (hideSmallBalances) {
      filtered = filtered.filter(asset => asset.usdValue > 10);
    }

    // Type filter
    if (selectedFilter === 'fiat') {
      filtered = filtered.filter(asset => ['USDT', 'USDC'].includes(asset.symbol));
    } else if (selectedFilter === 'crypto') {
      filtered = filtered.filter(asset => !['USDT', 'USDC'].includes(asset.symbol));
    }

    // Sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'balance':
          comparison = a.balance - b.balance;
          break;
        case 'usdValue':
          comparison = a.usdValue - b.usdValue;
          break;
        case 'change24h':
          comparison = a.change24h - b.change24h;
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [assets, searchQuery, hideSmallBalances, selectedFilter, sortField, sortOrder]);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const toggleBalanceVisibility = useCallback(() => {
    setBalanceVisible(prev => !prev);
  }, []);

  const toggleSmallBalances = useCallback(() => {
    setHideSmallBalances(prev => !prev);
  }, []);

  const handleSort = useCallback((field: SortField) => {
    if (sortField === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  }, [sortField]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    // Reset to original mock data with slight variations
    setAssets(MOCK_ASSETS.map(asset => ({
      ...asset,
      usdValue: asset.usdValue * (0.95 + Math.random() * 0.1),
      btcValue: asset.btcValue * (0.95 + Math.random() * 0.1),
      change24h: asset.change24h + (Math.random() - 0.5) * 2,
    })));
    setTimeout(() => setIsRefreshing(false), 500);
  }, []);

  const toggleDropdown = useCallback((assetId: string) => {
    setOpenDropdown(prev => prev === assetId ? null : assetId);
  }, []);

  const closeDropdown = useCallback(() => {
    setOpenDropdown(null);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => closeDropdown();
    if (openDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [openDropdown, closeDropdown]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K for search focus
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.querySelector<HTMLInputElement>('input[type="text"]')?.focus();
      }
      // Ctrl/Cmd + H to toggle hide small balances
      if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
        e.preventDefault();
        toggleSmallBalances();
      }
      // Ctrl/Cmd + R to refresh
      if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        handleRefresh();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [toggleSmallBalances, handleRefresh]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section - Total Balance */}
      <div className="relative bg-gradient-to-r from-black via-gray-900 to-black overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full filter blur-3xl animate-blob" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-white rounded-full filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-white rounded-full filter blur-3xl animate-blob animation-delay-4000" />
        </div>

        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-xl flex items-center justify-center">
                  <WalletIcon />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold text-white">My Assets</h1>
                    <div className="flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-xl rounded-lg">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-xs text-gray-300">Live</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">Manage your cryptocurrency portfolio</p>
                </div>
              </div>
              
              <button
                onClick={toggleBalanceVisibility}
                className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-xl transition-all duration-300 hover:scale-105"
                aria-label="Toggle balance visibility"
              >
                {balanceVisible ? <EyeIcon /> : <EyeOffIcon />}
              </button>
            </div>

            {/* Balance Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Total Balance Card */}
              <div className="md:col-span-2 bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-[1.02]">
                <p className="text-gray-400 text-sm mb-2">Total Balance</p>
                <div className="flex items-baseline gap-4 mb-4">
                  <h2 className="text-5xl font-bold text-white">
                    {balanceVisible ? `$${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '••••••'}
                  </h2>
                  <div className={`flex items-center gap-1 px-3 py-1 rounded-lg ${total24hChange >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    <span className="text-lg font-bold">
                      {total24hChange >= 0 ? '+' : ''}{total24hChange.toFixed(2)}%
                    </span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">
                  ≈ {balanceVisible ? `${totalBTCValue.toFixed(8)} BTC` : '•••• BTC'}
                </p>
                
                {/* Quick Actions */}
                <div className="flex gap-3 mt-6">
                  <Link
                    href="/assets/deposit"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-all duration-300 hover:scale-105"
                  >
                    <DepositIcon />
                    Deposit
                  </Link>
                  <Link
                    href="/assets/withdraw"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/20 text-white rounded-xl font-bold hover:bg-white/30 transition-all duration-300 hover:scale-105"
                  >
                    <WithdrawIcon />
                    Withdraw
                  </Link>
                  <Link
                    href="/trade"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/20 text-white rounded-xl font-bold hover:bg-white/30 transition-all duration-300 hover:scale-105"
                  >
                    <TradeIcon />
                    Trade
                  </Link>
                </div>
              </div>

              {/* Portfolio Distribution */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-400 text-sm">Portfolio</p>
                  <ChartIcon />
                </div>
                
                <div className="space-y-3">
                  {assets
                    .sort((a, b) => b.usdValue - a.usdValue)
                    .slice(0, 5)
                    .map((asset) => {
                      const percentage = totalBalance > 0 ? (asset.usdValue / totalBalance) * 100 : 0;
                      return (
                        <div key={asset.id}>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-white font-medium">{asset.symbol}</span>
                            <span className="text-gray-400">{percentage.toFixed(1)}%</span>
                          </div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-white to-gray-400 rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Controls Bar */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 mb-6">
            <div className="flex flex-col md:flex-row items-center gap-4">
              {/* Search */}
              <div className="flex-1 relative w-full">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <SearchIcon />
                </div>
                <input
                  type="text"
                  placeholder="Search assets... (Ctrl+K)"
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Filters */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="flex bg-gray-100 rounded-xl p-1 flex-1 md:flex-none">
                  <button
                    onClick={() => setSelectedFilter('all')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedFilter === 'all' ? 'bg-white text-black shadow-sm' : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setSelectedFilter('crypto')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedFilter === 'crypto' ? 'bg-white text-black shadow-sm' : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    Crypto
                  </button>
                  <button
                    onClick={() => setSelectedFilter('fiat')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedFilter === 'fiat' ? 'bg-white text-black shadow-sm' : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    Fiat
                  </button>
                </div>

                <button
                  onClick={toggleSmallBalances}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
                    hideSmallBalances ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <FilterIcon />
                  Hide Small
                </button>

                <button
                  onClick={handleRefresh}
                  className={`p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all hover:scale-105 ${
                    isRefreshing ? 'animate-spin' : ''
                  }`}
                  aria-label="Refresh"
                  disabled={isRefreshing}
                >
                  <RefreshIcon />
                </button>
              </div>
            </div>
          </div>

          {/* Assets Table */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-600">
              <button
                onClick={() => handleSort('name')}
                className="col-span-3 text-left hover:text-black transition-colors flex items-center gap-1"
              >
                Asset
                {sortField === 'name' && (
                  <span className={`transition-transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`}>▼</span>
                )}
              </button>
              <button
                onClick={() => handleSort('balance')}
                className="col-span-2 text-right hover:text-black transition-colors flex items-center justify-end gap-1"
              >
                Balance
                {sortField === 'balance' && (
                  <span className={`transition-transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`}>▼</span>
                )}
              </button>
              <div className="col-span-2 text-right">Available</div>
              <button
                onClick={() => handleSort('usdValue')}
                className="col-span-2 text-right hover:text-black transition-colors flex items-center justify-end gap-1"
              >
                USD Value
                {sortField === 'usdValue' && (
                  <span className={`transition-transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`}>▼</span>
                )}
              </button>
              <button
                onClick={() => handleSort('change24h')}
                className="col-span-2 text-right hover:text-black transition-colors flex items-center justify-end gap-1"
              >
                24h Change
                {sortField === 'change24h' && (
                  <span className={`transition-transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`}>▼</span>
                )}
              </button>
              <div className="col-span-1 text-right">Actions</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-100">
              {filteredAssets.length > 0 ? (
                filteredAssets.map((asset, index) => (
                  <div
                    key={asset.id}
                    className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Asset Info */}
                    <div className="col-span-3 flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-gray-900 to-gray-700 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {asset.icon}
                      </div>
                      <div>
                        <p className="font-bold text-black">{asset.symbol}</p>
                        <p className="text-sm text-gray-500">{asset.name}</p>
                      </div>
                    </div>

                    {/* Balance */}
                    <div className="col-span-2 text-right flex flex-col justify-center">
                      <p className="font-semibold text-black">
                        {balanceVisible ? asset.balance.toFixed(8) : '••••••'}
                      </p>
                      <p className="text-xs text-gray-500">{asset.symbol}</p>
                    </div>

                    {/* Available */}
                    <div className="col-span-2 text-right flex flex-col justify-center">
                      <p className="font-medium text-gray-700">
                        {balanceVisible ? asset.available.toFixed(8) : '••••••'}
                      </p>
                    </div>

                    {/* USD Value */}
                    <div className="col-span-2 text-right flex flex-col justify-center">
                      <p className="font-bold text-black">
                        {balanceVisible ? `$${asset.usdValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '••••••'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {balanceVisible ? `≈ ${asset.btcValue.toFixed(8)} BTC` : '•••• BTC'}
                      </p>
                    </div>

                    {/* 24h Change */}
                    <div className="col-span-2 text-right flex items-center justify-end">
                      <div className={`px-3 py-1 rounded-lg font-bold ${
                        asset.change24h >= 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                      }`}>
                        {asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(2)}%
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="col-span-1 flex items-center justify-end gap-2">
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleDropdown(asset.id);
                          }}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                          </svg>
                        </button>
                        
                        {/* Dropdown Menu */}
                        {openDropdown === asset.id && (
                          <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 animate-fade-in">
                            <Link
                              href={`/trade?symbol=${asset.symbol}`}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-t-xl transition-colors"
                              onClick={closeDropdown}
                            >
                              Trade
                            </Link>
                            <button
                              onClick={() => {
                                closeDropdown();
                                alert(`Deposit ${asset.symbol} - Feature coming soon!`);
                              }}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              Deposit
                            </button>
                            <button
                              onClick={() => {
                                closeDropdown();
                                alert(`Withdraw ${asset.symbol} - Feature coming soon!`);
                              }}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              Withdraw
                            </button>
                            <button
                              onClick={() => {
                                closeDropdown();
                                alert(`${asset.symbol} Transaction History - Feature coming soon!`);
                              }}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-b-xl transition-colors"
                            >
                              History
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-20 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <SearchIcon />
                  </div>
                  <p className="text-gray-500 font-medium">No assets found</p>
                  <p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p>
                </div>
              )}
            </div>

            {/* Results Summary */}
            {filteredAssets.length > 0 && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Showing <span className="font-bold text-black">{filteredAssets.length}</span> of{' '}
                  <span className="font-bold text-black">{assets.length}</span> assets
                  {hideSmallBalances && (
                    <span className="text-gray-400"> (small balances hidden)</span>
                  )}
                </p>
              </div>
            )}
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Link href="/assets/history" className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4 text-white">
                <HistoryIcon />
              </div>
              <h3 className="font-bold text-black mb-2">Transaction History</h3>
              <p className="text-sm text-gray-600">View all your deposits, withdrawals, and trades</p>
            </Link>

            <Link href="/assets/earn" className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4 text-white">
                <ChartIcon />
              </div>
              <h3 className="font-bold text-black mb-2">Earn Rewards</h3>
              <p className="text-sm text-gray-600">Stake your crypto and earn passive income</p>
            </Link>

            <Link href="/assets/convert" className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-4 text-white">
                <TradeIcon />
              </div>
              <h3 className="font-bold text-black mb-2">Convert Assets</h3>
              <p className="text-sm text-gray-600">Quick conversion between cryptocurrencies</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(AssetsPage);

