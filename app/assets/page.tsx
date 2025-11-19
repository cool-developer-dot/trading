'use client';

import { memo, useCallback, useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Icon Components
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

const MoreIcon = memo(() => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
  </svg>
));
MoreIcon.displayName = 'MoreIcon';

const ChartIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
));
ChartIcon.displayName = 'ChartIcon';

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
  color: string;
}

// Mock Data with realistic values
const MOCK_ASSETS: Asset[] = [
  { id: '1', name: 'Bitcoin', symbol: 'BTC', balance: 0.45823008, available: 0.45823008, locked: 0, usdValue: 19925.211, btcValue: 0.45823008, change24h: 2.70, icon: '₿', color: '#F7931A' },
  { id: '2', name: 'Ethereum', symbol: 'ETH', balance: 5.23400000, available: 5.23400000, locked: 0, usdValue: 10411.55, btcValue: 0.23456, change24h: -0.70, icon: 'Ξ', color: '#627EEA' },
  { id: '3', name: 'USDT', symbol: 'USDT', balance: 5000.00000000, available: 5000.00000000, locked: 0, usdValue: 5000.00, btcValue: 0.11901, change24h: -0.54, icon: '₮', color: '#26A17B' },
  { id: '4', name: 'Binance Coin', symbol: 'BNB', balance: 12.45000000, available: 12.45000000, locked: 0, usdValue: 3619.801, btcValue: 0.08234, change24h: 3.91, icon: '◈', color: '#F3BA2F' },
  { id: '5', name: 'USDC', symbol: 'USDC', balance: 3000.00000000, available: 3000.00000000, locked: 0, usdValue: 3008.107, btcValue: 0.07141, change24h: 0.07, icon: '$', color: '#2775CA' },
  { id: '6', name: 'Solana', symbol: 'SOL', balance: 23.45000000, available: 23.45000000, locked: 0, usdValue: 2269.273, btcValue: 0.05589, change24h: -2.67, icon: '◎', color: '#14F195' },
  { id: '7', name: 'Polkadot', symbol: 'DOT', balance: 234.56000000, available: 234.56000000, locked: 0, usdValue: 1390.849, btcValue: 0.03467, change24h: 4.10, icon: '●', color: '#E6007A' },
  { id: '8', name: 'Ripple', symbol: 'XRP', balance: 2345.67000000, available: 2345.67000000, locked: 0, usdValue: 1268.945, btcValue: 0.02938, change24h: 1.51, icon: '✕', color: '#00AAE4' },
  { id: '9', name: 'Dogecoin', symbol: 'DOGE', balance: 12345.67000000, available: 12345.67000000, locked: 0, usdValue: 1016.059, btcValue: 0.02351, change24h: -3.16, icon: 'Ð', color: '#C2A633' },
  { id: '10', name: 'Cardano', symbol: 'ADA', balance: 1234.56000000, available: 1234.56000000, locked: 0, usdValue: 453.521, btcValue: 0.01087, change24h: -5.60, icon: '₳', color: '#0033AD' },
];

type SortField = 'name' | 'balance' | 'usdValue' | 'change24h';
type SortOrder = 'asc' | 'desc';

const AssetsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hideSmallBalances, setHideSmallBalances] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [assets, setAssets] = useState<Asset[]>(MOCK_ASSETS);
  const [sortField, setSortField] = useState<SortField>('usdValue');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Initialize client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAssets(prevAssets =>
        prevAssets.map(asset => {
          const priceChange = (Math.random() - 0.5) * 0.5; // -0.25% to +0.25%
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
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Calculate totals
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

    if (searchQuery) {
      filtered = filtered.filter(
        asset =>
          asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          asset.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (hideSmallBalances) {
      filtered = filtered.filter(asset => asset.usdValue > 10);
    }

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
  }, [assets, searchQuery, hideSmallBalances, sortField, sortOrder]);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
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

  // Get top assets for portfolio display
  const topAssets = useMemo(() => {
    return [...assets]
      .sort((a, b) => b.usdValue - a.usdValue)
      .slice(0, 2);
  }, [assets]);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Hero Section - Dark Card */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            {/* My Assets Card - Dark Theme */}
            <div className="bg-gradient-to-br from-[#1E1E1E] via-[#2A2A2A] to-[#1E1E1E] rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full filter blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full filter blur-3xl" />
              </div>

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white">My Assets</h1>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/20 backdrop-blur-sm rounded-full border border-green-500/30">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-xs font-semibold text-green-400">Live</span>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </div>

                <p className="text-gray-400 text-sm mb-6">Manage your cryptocurrency portfolio</p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Total Balance */}
                  <div className="lg:col-span-2">
                    <p className="text-gray-400 text-sm mb-2">Total Balance</p>
                    <div className="flex items-baseline gap-4 mb-2">
                      <h2 className="text-4xl sm:text-5xl font-bold text-white">
                        ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </h2>
                      <div className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-bold ${
                        total24hChange >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {total24hChange >= 0 ? '+' : ''}{total24hChange.toFixed(2)}%
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-6">
                      ≈ {totalBTCValue.toFixed(8)} BTC
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Link
                        href="/assets/deposit"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        <DepositIcon />
                        <span className="hidden sm:inline">Deposit</span>
                      </Link>
                      <Link
                        href="/assets/withdraw"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-200 backdrop-blur-sm border border-white/20"
                      >
                        <WithdrawIcon />
                        <span className="hidden sm:inline">Withdraw</span>
                      </Link>
                      <Link
                        href="/trade"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-200 backdrop-blur-sm border border-white/20"
                      >
                        <TradeIcon />
                        <span className="hidden sm:inline">Trade</span>
                      </Link>
                    </div>
                  </div>

                  {/* Portfolio Distribution */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-white font-semibold">Portfolio</h3>
                      <ChartIcon />
                    </div>
                    
                    <div className="space-y-4">
                      {topAssets.map((asset) => {
                        const percentage = totalBalance > 0 ? (asset.usdValue / totalBalance) * 100 : 0;
                        return (
                          <div key={asset.id}>
                            <div className="flex items-center justify-between text-sm mb-2">
                              <span className="text-white font-medium">{asset.symbol}</span>
                              <span className="text-gray-400">{percentage.toFixed(1)}%</span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{ 
                                  width: `${percentage}%`,
                                  backgroundColor: asset.color
                                }}
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
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Search */}
              <div className="flex-1 relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <SearchIcon />
                </div>
                <input
                  type="text"
                  placeholder="Search assets..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                />
              </div>

              {/* Hide Small Balances */}
              <label className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={hideSmallBalances}
                  onChange={toggleSmallBalances}
                  className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-sm font-medium text-gray-700">Hide Small Balances</span>
              </label>
            </div>
          </div>

          {/* Assets Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left">
                      <button
                        onClick={() => handleSort('name')}
                        className="text-xs font-semibold text-gray-600 uppercase tracking-wider hover:text-gray-900 transition-colors flex items-center gap-1"
                      >
                        Asset
                        {sortField === 'name' && (
                          <span className={`text-xs transition-transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`}>▼</span>
                        )}
                      </button>
                    </th>
                    <th className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleSort('balance')}
                        className="text-xs font-semibold text-gray-600 uppercase tracking-wider hover:text-gray-900 transition-colors flex items-center justify-end gap-1 ml-auto"
                      >
                        Balance
                        {sortField === 'balance' && (
                          <span className={`text-xs transition-transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`}>▼</span>
                        )}
                      </button>
                    </th>
                    <th className="px-6 py-4 text-right">
                      <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Available/USD Value
                      </span>
                    </th>
                    <th className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleSort('change24h')}
                        className="text-xs font-semibold text-gray-600 uppercase tracking-wider hover:text-gray-900 transition-colors flex items-center justify-end gap-1 ml-auto"
                      >
                        24h Change
                        {sortField === 'change24h' && (
                          <span className={`text-xs transition-transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`}>▼</span>
                        )}
                      </button>
                    </th>
                    <th className="px-6 py-4 text-right">
                      <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredAssets.length > 0 ? (
                    filteredAssets.map((asset, index) => (
                      <tr
                        key={asset.id}
                        className="hover:bg-gray-50 transition-colors"
                        style={{ animationDelay: `${index * 30}ms` }}
                      >
                        {/* Asset Info */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md"
                              style={{ backgroundColor: asset.color }}
                            >
                              {asset.icon}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{asset.symbol}</p>
                              <p className="text-sm text-gray-500">{asset.name}</p>
                            </div>
                          </div>
                        </td>

                        {/* Balance */}
                        <td className="px-6 py-4 text-right">
                          <p className="font-semibold text-gray-900">
                            {asset.balance.toFixed(8).replace(/\.?0+$/, '')}
                          </p>
                          <p className="text-sm text-gray-500">{asset.symbol}</p>
                        </td>

                        {/* Available / USD Value */}
                        <td className="px-6 py-4 text-right">
                          <p className="font-semibold text-gray-900">
                            ${asset.usdValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </p>
                          <p className="text-sm text-gray-500">
                            {asset.available.toFixed(8).replace(/\.?0+$/, '')} {asset.symbol}
                          </p>
                          <p className="text-xs text-gray-400">
                            ≈ {asset.btcValue.toFixed(8)} BTC
                          </p>
                        </td>

                        {/* 24h Change */}
                        <td className="px-6 py-4 text-right">
                          <span className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-semibold ${
                            asset.change24h >= 0 
                              ? 'text-green-700 bg-green-50' 
                              : 'text-red-700 bg-red-50'
                          }`}>
                            {asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(2)}%
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end">
                            <div className="relative">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleDropdown(asset.id);
                                }}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              >
                                <MoreIcon />
                              </button>
                              
                              {openDropdown === asset.id && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 py-2 animate-fade-in">
                                  <Link
                                    href={`/trade?symbol=${asset.symbol}`}
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                    onClick={closeDropdown}
                                  >
                                    <TradeIcon />
                                    Trade {asset.symbol}
                                  </Link>
                                  <Link
                                    href={`/assets/deposit`}
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                    onClick={closeDropdown}
                                  >
                                    <DepositIcon />
                                    Deposit {asset.symbol}
                                  </Link>
                                  <Link
                                    href={`/assets/withdraw`}
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                    onClick={closeDropdown}
                                  >
                                    <WithdrawIcon />
                                    Withdraw {asset.symbol}
                                  </Link>
                                  <button
                                    onClick={() => {
                                      closeDropdown();
                                      alert(`${asset.symbol} Transaction History - Coming soon!`);
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                  >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Transaction History
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-20 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <SearchIcon />
                          </div>
                          <p className="text-gray-900 font-semibold mb-1">No assets found</p>
                          <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            {filteredAssets.length > 0 && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Showing <span className="font-semibold text-gray-900">{filteredAssets.length}</span> of{' '}
                  <span className="font-semibold text-gray-900">{assets.length}</span> assets
                  {hideSmallBalances && (
                    <span className="text-gray-500"> (small balances hidden)</span>
                  )}
                </p>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <Link 
              href="/assets/history" 
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 hover:border-blue-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Transaction History</h3>
                  <p className="text-sm text-gray-500">View all your deposits, withdrawals, and trades</p>
                </div>
              </div>
            </Link>

            <Link 
              href="/assets/earn" 
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 hover:border-green-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-colors">
                  <ChartIcon />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Earn Rewards</h3>
                  <p className="text-sm text-gray-500">Stake your crypto and earn passive income</p>
                </div>
              </div>
            </Link>

            <Link 
              href="/assets/convert" 
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 hover:border-purple-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-purple-200 transition-colors">
                  <TradeIcon />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Convert Assets</h3>
                  <p className="text-sm text-gray-500">Quick conversion between cryptocurrencies</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(AssetsPage);
