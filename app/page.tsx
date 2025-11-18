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
    <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-black rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">Welcome to Binance</h1>
            <p className="text-sm sm:text-base text-gray-300">Your gateway to cryptocurrency trading</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-xl rounded-lg">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs sm:text-sm">Markets Live</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-xl rounded-lg sm:rounded-xl p-3 sm:p-4">
              <div className="text-xs sm:text-sm text-gray-400 mb-1 truncate">{stat.label}</div>
              <div className="text-lg sm:text-xl md:text-2xl font-bold mb-1 truncate">{stat.value}</div>
              <div className={`text-xs flex items-center gap-1 ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>
                {stat.positive ? <ArrowUpIcon /> : <ArrowDownIcon />}
                <span className="truncate">{stat.change}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        <Link href="/trade" className="group bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-gray-200 hover:border-black hover:shadow-xl transition-all">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black rounded-lg sm:rounded-xl flex items-center justify-center text-white mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
            <TrendingUpIcon />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-black mb-2">Start Trading</h3>
          <p className="text-gray-600 text-xs sm:text-sm">Buy, sell, and trade 350+ cryptocurrencies</p>
          <div className="mt-3 sm:mt-4 text-black font-semibold flex items-center gap-2 text-sm">
            Trade Now
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        <Link href="/assets/deposit" className="group bg-gradient-to-br from-green-50 to-green-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-green-200 hover:border-green-500 hover:shadow-xl transition-all">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-lg sm:rounded-xl flex items-center justify-center text-white mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m0 0l-4-4m4 4l4-4" />
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-black mb-2">Deposit Funds</h3>
          <p className="text-gray-600 text-xs sm:text-sm">Fund your account instantly</p>
          <div className="mt-3 sm:mt-4 text-green-700 font-semibold flex items-center gap-2 text-sm">
            Deposit Now
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        <Link href="/portfolio" className="group bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-purple-200 hover:border-purple-500 hover:shadow-xl transition-all sm:col-span-2 lg:col-span-1">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500 rounded-lg sm:rounded-xl flex items-center justify-center text-white mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
            <ChartIcon />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-black mb-2">View Portfolio</h3>
          <p className="text-gray-600 text-xs sm:text-sm">Track your investments</p>
          <div className="mt-3 sm:mt-4 text-purple-700 font-semibold flex items-center gap-2 text-sm">
            View Now
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      </div>

      {/* Market Overview */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-black mb-1">Market Overview</h2>
            <p className="text-sm sm:text-base text-gray-600">Top performing cryptocurrencies</p>
          </div>
          <Link
            href="/markets"
            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-black text-white rounded-lg sm:rounded-xl font-semibold hover:bg-gray-800 transition-colors text-center text-sm sm:text-base"
          >
            View All Markets
          </Link>
        </div>

        {/* Market Table - Desktop */}
        <div className="hidden md:block overflow-x-auto">
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

        {/* Market Cards - Mobile */}
        <div className="md:hidden divide-y divide-gray-100">
          {cryptoData.map((crypto, index) => (
            <div key={crypto.symbol} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="text-sm text-gray-500 w-6">{index + 1}</div>
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    {crypto.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-black truncate">{crypto.symbol}</div>
                    <div className="text-xs text-gray-500 truncate">{crypto.name}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-black text-sm">
                    ${crypto.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold ${
                    crypto.change >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {crypto.change >= 0 ? '+' : ''}{crypto.change.toFixed(2)}%
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                <span>Vol: {crypto.volume}</span>
                <span>MCap: {crypto.marketCap}</span>
              </div>
              <Link
                href={`/trade?pair=${crypto.symbol}USDT`}
                className="block w-full py-2 bg-black text-white rounded-lg font-semibold text-sm text-center hover:bg-gray-800 transition-colors"
              >
                Trade {crypto.symbol}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {[
          { icon: '🛡️', title: 'Secure Trading', desc: 'Multi-layer protection', color: 'bg-blue-100' },
          { icon: '⚡', title: 'Lightning Fast', desc: '0.03s response time', color: 'bg-green-100' },
          { icon: '💰', title: 'Low Fees', desc: 'Starting at 0.1%', color: 'bg-yellow-100' },
          { icon: '🌐', title: '24/7 Support', desc: 'Always available', color: 'bg-purple-100' },
        ].map((feature, index) => (
          <div key={index} className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 ${feature.color} rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 text-xl sm:text-2xl`}>
              {feature.icon}
            </div>
            <h3 className="font-bold text-black mb-1 sm:mb-2 text-sm sm:text-base">{feature.title}</h3>
            <p className="text-xs sm:text-sm text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* Promotional Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white">
        <div className="max-w-3xl">
          <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-xl rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            🎉 Limited Time Offer
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3">Get 0% Trading Fees</h2>
          <p className="text-sm sm:text-base text-white/90 mb-4 sm:mb-6">
            New users get zero trading fees for the first 30 days!
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <Link
              href="/auth"
              className="px-4 sm:px-6 py-2 sm:py-3 bg-white text-black rounded-lg sm:rounded-xl font-bold hover:bg-gray-100 transition-colors text-center text-sm sm:text-base"
            >
              Create Account
            </Link>
            <Link
              href="/markets"
              className="px-4 sm:px-6 py-2 sm:py-3 bg-white/20 backdrop-blur-xl text-white rounded-lg sm:rounded-xl font-bold hover:bg-white/30 transition-colors text-center text-sm sm:text-base"
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
