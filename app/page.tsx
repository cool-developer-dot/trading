'use client';

import { memo, useEffect, useState, useMemo } from 'react';
import Link from 'next/link';

// Icon Components
const TrendingUpIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
));
TrendingUpIcon.displayName = 'TrendingUpIcon';

const ArrowUpIcon = memo(() => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
  </svg>
));
ArrowUpIcon.displayName = 'ArrowUpIcon';

const ArrowDownIcon = memo(() => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
  </svg>
));
ArrowDownIcon.displayName = 'ArrowDownIcon';

const ChartIcon = memo(() => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
));
ChartIcon.displayName = 'ChartIcon';

interface CryptoData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: string;
  marketCap: string;
  logo: string;
}

const FEATURED_CRYPTOS: CryptoData[] = [
  { symbol: 'BTC', name: 'Bitcoin', price: 102651.50, change: -1.32, volume: '$76.2B', marketCap: '$2.0T', logo: '₿' },
  { symbol: 'ETH', name: 'Ethereum', price: 3494.28, change: -5.99, volume: '$32.1B', marketCap: '$420.5B', logo: 'Ξ' },
  { symbol: 'BNB', name: 'BNB', price: 645.23, change: 2.45, volume: '$2.8B', marketCap: '$93.8B', logo: 'Ⓑ' },
  { symbol: 'SOL', name: 'Solana', price: 160.40, change: -8.45, volume: '$8.4B', marketCap: '$73.2B', logo: '◎' },
  { symbol: 'XRP', name: 'XRP', price: 2.2550, change: -6.70, volume: '$12.5B', marketCap: '$128.1B', logo: '✕' },
  { symbol: 'ADA', name: 'Cardano', price: 0.8945, change: -4.23, volume: '$1.9B', marketCap: '$31.4B', logo: '₳' },
];

const Home = () => {
  const [cryptoData, setCryptoData] = useState(FEATURED_CRYPTOS);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Simulate live price updates
    const interval = setInterval(() => {
      setCryptoData(prev => prev.map(crypto => ({
        ...crypto,
        price: crypto.price + (Math.random() - 0.5) * (crypto.price * 0.001),
        change: crypto.change + (Math.random() - 0.5) * 0.5,
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const stats = useMemo(() => [
    { label: '24h Volume', value: '$76.2B', change: '+12.4%', positive: true },
    { label: 'Active Traders', value: '2.4M', change: '+8.2%', positive: true },
    { label: 'Total Markets', value: '350+', change: '+15', positive: true },
    { label: 'Avg Response', value: '0.03s', change: '-12%', positive: true },
  ], []);

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-black rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome to Binance</h1>
            <p className="text-gray-300">Your gateway to the world of cryptocurrency trading</p>
          </div>
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-lg">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm">Markets Live</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-xl rounded-xl p-4">
              <div className="text-sm text-gray-400 mb-1">{stat.label}</div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className={`text-xs flex items-center gap-1 ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>
                {stat.positive ? <ArrowUpIcon /> : <ArrowDownIcon />}
                {stat.change}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/trade" className="group bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-black hover:shadow-xl transition-all">
          <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
            <TrendingUpIcon />
          </div>
          <h3 className="text-xl font-bold text-black mb-2">Start Trading</h3>
          <p className="text-gray-600 text-sm">Buy, sell, and trade 350+ cryptocurrencies with low fees</p>
          <div className="mt-4 text-black font-semibold flex items-center gap-2">
            Trade Now
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        <Link href="/assets/deposit" className="group bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border-2 border-green-200 hover:border-green-500 hover:shadow-xl transition-all">
          <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m0 0l-4-4m4 4l4-4" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-black mb-2">Deposit Funds</h3>
          <p className="text-gray-600 text-sm">Fund your account instantly with crypto or fiat</p>
          <div className="mt-4 text-green-700 font-semibold flex items-center gap-2">
            Deposit Now
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        <Link href="/portfolio" className="group bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border-2 border-purple-200 hover:border-purple-500 hover:shadow-xl transition-all">
          <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
            <ChartIcon />
          </div>
          <h3 className="text-xl font-bold text-black mb-2">View Portfolio</h3>
          <p className="text-gray-600 text-sm">Track your investments and monitor performance</p>
          <div className="mt-4 text-purple-700 font-semibold flex items-center gap-2">
            View Now
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      </div>

      {/* Market Overview */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-black mb-1">Market Overview</h2>
            <p className="text-gray-600">Top performing cryptocurrencies</p>
          </div>
          <Link
            href="/markets"
            className="px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
          >
            View All Markets
          </Link>
        </div>

        {/* Market Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">#</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Name</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Price</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">24h Change</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">24h Volume</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Market Cap</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {cryptoData.map((crypto, index) => (
                <tr key={crypto.symbol} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-600">{index + 1}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {crypto.logo}
                      </div>
                      <div>
                        <div className="font-bold text-black">{crypto.symbol}</div>
                        <div className="text-sm text-gray-500">{crypto.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="font-bold text-black">
                      ${crypto.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg font-semibold ${
                      crypto.change >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {crypto.change >= 0 ? <ArrowUpIcon /> : <ArrowDownIcon />}
                      {crypto.change >= 0 ? '+' : ''}{crypto.change.toFixed(2)}%
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-gray-700">{crypto.volume}</td>
                  <td className="px-6 py-4 text-right font-semibold text-gray-700">{crypto.marketCap}</td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/trade?pair=${crypto.symbol}USDT`}
                      className="inline-block px-4 py-2 bg-black text-white rounded-lg font-semibold text-sm hover:bg-gray-800 transition-colors"
                    >
                      Trade
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="font-bold text-black mb-2">Secure Trading</h3>
          <p className="text-sm text-gray-600">Industry-leading security with multi-layer protection</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="font-bold text-black mb-2">Lightning Fast</h3>
          <p className="text-sm text-gray-600">Execute trades instantly with 0.03s response time</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="font-bold text-black mb-2">Low Fees</h3>
          <p className="text-sm text-gray-600">Competitive trading fees starting at 0.1%</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h3 className="font-bold text-black mb-2">24/7 Support</h3>
          <p className="text-sm text-gray-600">Round-the-clock customer support available</p>
        </div>
      </div>

      {/* Promotional Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <div className="max-w-3xl">
          <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-xl rounded-full text-sm font-semibold mb-4">
            🎉 Limited Time Offer
          </div>
          <h2 className="text-3xl font-bold mb-3">Get 0% Trading Fees on Your First Trade</h2>
          <p className="text-white/90 mb-6">
            New users get zero trading fees for the first 30 days. Start your crypto journey today!
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/auth"
              className="px-6 py-3 bg-white text-black rounded-xl font-bold hover:bg-gray-100 transition-colors"
            >
              Create Account
            </Link>
            <Link
              href="/markets"
              className="px-6 py-3 bg-white/20 backdrop-blur-xl text-white rounded-xl font-bold hover:bg-white/30 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Home);
