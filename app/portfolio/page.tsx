'use client';

import { memo, useCallback, useMemo, useState, useEffect } from 'react';
import Link from 'next/link';

// Icon Components
const ChartPieIcon = memo(() => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
  </svg>
));
ChartPieIcon.displayName = 'ChartPieIcon';

const TrendingUpIcon = memo(() => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
));
TrendingUpIcon.displayName = 'TrendingUpIcon';

const TrendingDownIcon = memo(() => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
  </svg>
));
TrendingDownIcon.displayName = 'TrendingDownIcon';

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

const RefreshIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
));
RefreshIcon.displayName = 'RefreshIcon';

const CalendarIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
));
CalendarIcon.displayName = 'CalendarIcon';

const StarIcon = memo(() => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
));
StarIcon.displayName = 'StarIcon';

const BoltIcon = memo(() => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
  </svg>
));
BoltIcon.displayName = 'BoltIcon';

const FireIcon = memo(() => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 23C7.589 23 4 19.411 4 15c0-3.518 2.614-6.432 6-6.92V6a1 1 0 011.993-.117l.007.127v2.08c3.386.488 6 3.402 6 6.92 0 4.411-3.589 8-8 8zm0-2a6 6 0 100-12 6 6 0 000 12z" />
  </svg>
));
FireIcon.displayName = 'FireIcon';

// Types
interface PortfolioAsset {
  symbol: string;
  name: string;
  balance: number;
  avgBuyPrice: number;
  currentPrice: number;
  totalValue: number;
  profitLoss: number;
  profitLossPercent: number;
  allocation: number;
  icon: string;
}

interface PerformanceData {
  date: string;
  value: number;
}

// Mock Data
const PORTFOLIO_ASSETS: PortfolioAsset[] = [
  { symbol: 'BTC', name: 'Bitcoin', balance: 0.45823, avgBuyPrice: 38000, currentPrice: 42000, totalValue: 19245.66, profitLoss: 1833.66, profitLossPercent: 10.53, allocation: 41.2, icon: '₿' },
  { symbol: 'ETH', name: 'Ethereum', balance: 5.234, avgBuyPrice: 1750, currentPrice: 1886, totalValue: 9871.32, profitLoss: 711.82, profitLossPercent: 7.77, allocation: 21.1, icon: 'Ξ' },
  { symbol: 'BNB', name: 'Binance Coin', balance: 12.45, avgBuyPrice: 265, currentPrice: 278, totalValue: 3461.10, profitLoss: 161.85, profitLossPercent: 4.91, allocation: 7.4, icon: '◈' },
  { symbol: 'USDT', name: 'Tether', balance: 5000, avgBuyPrice: 1, currentPrice: 1, totalValue: 5000, profitLoss: 0, profitLossPercent: 0, allocation: 10.7, icon: '₮' },
  { symbol: 'ADA', name: 'Cardano', balance: 1234.56, avgBuyPrice: 0.35, currentPrice: 0.37, totalValue: 456.79, profitLoss: 24.69, profitLossPercent: 5.71, allocation: 1.0, icon: '₳' },
  { symbol: 'SOL', name: 'Solana', balance: 23.45, avgBuyPrice: 95, currentPrice: 100, totalValue: 2345, profitLoss: 117.25, profitLossPercent: 5.26, allocation: 5.0, icon: '◎' },
  { symbol: 'DOT', name: 'Polkadot', balance: 234.56, avgBuyPrice: 6.0, currentPrice: 6.21, totalValue: 1456.62, profitLoss: 49.26, profitLossPercent: 3.50, allocation: 3.1, icon: '●' },
  { symbol: 'USDC', name: 'USD Coin', balance: 3000, avgBuyPrice: 1, currentPrice: 1, totalValue: 3000, profitLoss: 0, profitLossPercent: 0, allocation: 6.4, icon: '$' },
];

const PERFORMANCE_DATA: PerformanceData[] = [
  { date: 'Jan 1', value: 38500 },
  { date: 'Jan 5', value: 39200 },
  { date: 'Jan 10', value: 40100 },
  { date: 'Jan 15', value: 41500 },
  { date: 'Jan 20', value: 43200 },
  { date: 'Jan 25', value: 44800 },
  { date: 'Jan 30', value: 46730 },
];

const PortfolioPage = () => {
  const [assets, setAssets] = useState<PortfolioAsset[]>(PORTFOLIO_ASSETS);
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d' | '1y' | 'all'>('30d');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Calculate totals
  const totalValue = useMemo(() => {
    return assets.reduce((sum, asset) => sum + asset.totalValue, 0);
  }, [assets]);

  const totalProfitLoss = useMemo(() => {
    return assets.reduce((sum, asset) => sum + asset.profitLoss, 0);
  }, [assets]);

  const totalProfitLossPercent = useMemo(() => {
    const totalCost = assets.reduce((sum, asset) => sum + (asset.balance * asset.avgBuyPrice), 0);
    return totalCost > 0 ? ((totalValue - totalCost) / totalCost) * 100 : 0;
  }, [assets, totalValue]);

  const bestPerformer = useMemo(() => {
    return assets.reduce((best, asset) => 
      asset.profitLossPercent > best.profitLossPercent ? asset : best
    , assets[0]);
  }, [assets]);

  const topHolding = useMemo(() => {
    return assets.reduce((top, asset) => 
      asset.totalValue > top.totalValue ? asset : top
    , assets[0]);
  }, [assets]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAssets(prevAssets =>
        prevAssets.map(asset => {
          const priceChange = (Math.random() - 0.5) * 2; // -1% to +1%
          const newPrice = asset.currentPrice * (1 + priceChange / 100);
          const newTotalValue = asset.balance * newPrice;
          const newProfitLoss = (newPrice - asset.avgBuyPrice) * asset.balance;
          const newProfitLossPercent = ((newPrice - asset.avgBuyPrice) / asset.avgBuyPrice) * 100;

          return {
            ...asset,
            currentPrice: newPrice,
            totalValue: newTotalValue,
            profitLoss: newProfitLoss,
            profitLossPercent: newProfitLossPercent,
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const toggleBalanceVisibility = useCallback(() => {
    setBalanceVisible(prev => !prev);
  }, []);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 500);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-600 overflow-hidden">
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
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white">
                  <ChartPieIcon />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-4xl font-bold text-white">Portfolio</h1>
                    <div className="flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-xl rounded-lg">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-xs text-gray-200">Live</span>
                    </div>
                  </div>
                  <p className="text-white/80 mt-1">Track your investments and performance</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={handleRefresh}
                  className={`p-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-xl transition-all ${
                    isRefreshing ? 'animate-spin' : ''
                  }`}
                  aria-label="Refresh"
                  disabled={isRefreshing}
                >
                  <RefreshIcon />
                </button>
                <button
                  onClick={toggleBalanceVisibility}
                  className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-xl transition-all duration-300 hover:scale-105"
                  aria-label="Toggle balance visibility"
                >
                  {balanceVisible ? <EyeIcon /> : <EyeOffIcon />}
                </button>
              </div>
            </div>

            {/* Main Portfolio Card */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Total Value */}
                <div>
                  <p className="text-white/70 text-sm mb-2">Total Portfolio Value</p>
                  <div className="flex items-baseline gap-4 mb-4">
                    <h2 className="text-5xl font-bold text-white">
                      {balanceVisible ? `$${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '••••••'}
                    </h2>
                  </div>
                  
                  {/* Profit/Loss */}
                  <div className="flex items-center gap-3">
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
                      totalProfitLoss >= 0 
                        ? 'bg-green-500/20 text-green-300' 
                        : 'bg-red-500/20 text-red-300'
                    }`}>
                      {totalProfitLoss >= 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
                      <span className="text-xl font-bold">
                        {totalProfitLoss >= 0 ? '+' : ''}{balanceVisible ? `$${totalProfitLoss.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '••••'}
                      </span>
                    </div>
                    <div className={`px-4 py-2 rounded-xl font-bold ${
                      totalProfitLossPercent >= 0 
                        ? 'bg-green-500/20 text-green-300' 
                        : 'bg-red-500/20 text-red-300'
                    }`}>
                      {totalProfitLossPercent >= 0 ? '+' : ''}{totalProfitLossPercent.toFixed(2)}%
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 text-white/70 text-xs mb-2">
                      <StarIcon />
                      <span>Best Performer</span>
                    </div>
                    <p className="text-white font-bold text-lg">{bestPerformer.symbol}</p>
                    <p className="text-green-300 text-sm">+{bestPerformer.profitLossPercent.toFixed(2)}%</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 text-white/70 text-xs mb-2">
                      <FireIcon />
                      <span>Top Holding</span>
                    </div>
                    <p className="text-white font-bold text-lg">{topHolding.symbol}</p>
                    <p className="text-white/70 text-sm">{topHolding.allocation.toFixed(1)}%</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 text-white/70 text-xs mb-2">
                      <ChartPieIcon />
                      <span>Assets</span>
                    </div>
                    <p className="text-white font-bold text-lg">{assets.length}</p>
                    <p className="text-white/70 text-sm">Currencies</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 text-white/70 text-xs mb-2">
                      <BoltIcon />
                      <span>24h Change</span>
                    </div>
                    <p className="text-green-300 font-bold text-lg">+3.45%</p>
                    <p className="text-white/70 text-sm">$1,584.23</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Time Range Selector */}
            <div className="flex bg-white/10 backdrop-blur-xl rounded-xl p-1 border border-white/20 w-fit">
              {(['24h', '7d', '30d', '1y', 'all'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    timeRange === range 
                      ? 'bg-white text-orange-600 shadow-lg' 
                      : 'text-white hover:text-white/80'
                  }`}
                >
                  {range.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Holdings List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-black">Your Holdings</h2>
                </div>

                {/* Holdings Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Asset</th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Balance</th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Price</th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Value</th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">P&L</th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Allocation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {assets.map((asset, index) => (
                        <tr
                          key={asset.symbol}
                          className="hover:bg-gray-50 transition-colors animate-fade-in"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          {/* Asset */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-amber-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                {asset.icon}
                              </div>
                              <div>
                                <p className="font-bold text-black">{asset.symbol}</p>
                                <p className="text-sm text-gray-500">{asset.name}</p>
                              </div>
                            </div>
                          </td>

                          {/* Balance */}
                          <td className="px-6 py-4 text-right">
                            <p className="font-semibold text-black">
                              {balanceVisible ? asset.balance.toFixed(4) : '••••'}
                            </p>
                            <p className="text-xs text-gray-500">{asset.symbol}</p>
                          </td>

                          {/* Price */}
                          <td className="px-6 py-4 text-right">
                            <p className="font-medium text-black">
                              ${balanceVisible ? asset.currentPrice.toFixed(2) : '••••'}
                            </p>
                          </td>

                          {/* Value */}
                          <td className="px-6 py-4 text-right">
                            <p className="font-bold text-black">
                              ${balanceVisible ? asset.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 }) : '••••'}
                            </p>
                          </td>

                          {/* P&L */}
                          <td className="px-6 py-4 text-right">
                            <div className={`inline-flex flex-col items-end px-3 py-1 rounded-lg ${
                              asset.profitLoss >= 0 
                                ? 'bg-green-50 text-green-600' 
                                : 'bg-red-50 text-red-600'
                            }`}>
                              <p className="font-bold text-sm">
                                {asset.profitLoss >= 0 ? '+' : ''}${balanceVisible ? Math.abs(asset.profitLoss).toFixed(2) : '••••'}
                              </p>
                              <p className="text-xs font-medium">
                                {asset.profitLoss >= 0 ? '+' : ''}{asset.profitLossPercent.toFixed(2)}%
                              </p>
                            </div>
                          </td>

                          {/* Allocation */}
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-orange-600 to-amber-500 rounded-full"
                                  style={{ width: `${asset.allocation}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium text-gray-700">
                                {asset.allocation.toFixed(1)}%
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Portfolio Allocation */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-black mb-4">Allocation</h3>
                
                {/* Donut Chart Representation */}
                <div className="relative w-48 h-48 mx-auto mb-6">
                  <svg viewBox="0 0 100 100" className="transform -rotate-90">
                    {assets.slice(0, 5).map((asset, index) => {
                      const colors = ['#ea580c', '#f59e0b', '#eab308', '#84cc16', '#22c55e'];
                      const prevTotal = assets.slice(0, index).reduce((sum, a) => sum + a.allocation, 0);
                      const circumference = 2 * Math.PI * 30;
                      const strokeDasharray = `${(asset.allocation / 100) * circumference} ${circumference}`;
                      const strokeDashoffset = -((prevTotal / 100) * circumference);
                      
                      return (
                        <circle
                          key={asset.symbol}
                          cx="50"
                          cy="50"
                          r="30"
                          fill="none"
                          stroke={colors[index]}
                          strokeWidth="15"
                          strokeDasharray={strokeDasharray}
                          strokeDashoffset={strokeDashoffset}
                          className="transition-all duration-500"
                        />
                      );
                    })}
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-black">{assets.length}</p>
                      <p className="text-xs text-gray-500">Assets</p>
                    </div>
                  </div>
                </div>

                {/* Top 5 Assets */}
                <div className="space-y-3">
                  {assets.slice(0, 5).map((asset, index) => {
                    const colors = ['bg-orange-600', 'bg-amber-500', 'bg-yellow-500', 'bg-lime-500', 'bg-green-500'];
                    return (
                      <div key={asset.symbol} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${colors[index]}`} />
                          <span className="text-sm font-medium text-gray-700">{asset.symbol}</span>
                        </div>
                        <span className="text-sm font-bold text-black">{asset.allocation.toFixed(1)}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl shadow-lg border border-orange-200 p-6">
                <h3 className="text-xl font-bold text-black mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link
                    href="/assets"
                    className="block w-full py-3 bg-white text-black rounded-xl font-bold text-center hover:bg-gray-50 transition-all hover:scale-105"
                  >
                    View All Assets
                  </Link>
                  <Link
                    href="/trade"
                    className="block w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl font-bold text-center hover:from-orange-700 hover:to-amber-700 transition-all hover:scale-105"
                  >
                    Start Trading
                  </Link>
                  <Link
                    href="/assets/earn"
                    className="block w-full py-3 bg-white text-black rounded-xl font-bold text-center hover:bg-gray-50 transition-all hover:scale-105"
                  >
                    Earn Rewards
                  </Link>
                </div>
              </div>

              {/* Portfolio Insights */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-black mb-4">Insights</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                    <div className="flex items-center gap-2 text-green-700 mb-2">
                      <TrendingUpIcon />
                      <span className="font-bold text-sm">Strong Performance</span>
                    </div>
                    <p className="text-xs text-green-600">
                      Your portfolio is up {totalProfitLossPercent.toFixed(2)}% overall
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="flex items-center gap-2 text-blue-700 mb-2">
                      <ChartPieIcon />
                      <span className="font-bold text-sm">Diversified</span>
                    </div>
                    <p className="text-xs text-blue-600">
                      Well balanced across {assets.length} different assets
                    </p>
                  </div>

                  <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                    <div className="flex items-center gap-2 text-orange-700 mb-2">
                      <CalendarIcon />
                      <span className="font-bold text-sm">Opportunity</span>
                    </div>
                    <p className="text-xs text-orange-600">
                      Consider staking {bestPerformer.symbol} to earn passive income
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(PortfolioPage);

