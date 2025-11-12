'use client';

import { memo, useEffect, useState, useMemo } from 'react';
import Link from 'next/link';

// Icon Components
const ArrowRightIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </svg>
));
ArrowRightIcon.displayName = 'ArrowRightIcon';

const TrendingUpIcon = memo(() => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
));
TrendingUpIcon.displayName = 'TrendingUpIcon';

const ShieldIcon = memo(() => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
));
ShieldIcon.displayName = 'ShieldIcon';

const SparklesIcon = memo(() => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
));
SparklesIcon.displayName = 'SparklesIcon';

const LightningIcon = memo(() => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
));
LightningIcon.displayName = 'LightningIcon';

const GlobeIcon = memo(() => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
));
GlobeIcon.displayName = 'GlobeIcon';

const CheckIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
));
CheckIcon.displayName = 'CheckIcon';

const PlayIcon = memo(() => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
  </svg>
));
PlayIcon.displayName = 'PlayIcon';

// Mock crypto data
interface CryptoData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  logo: string;
}

const FEATURED_CRYPTOS: CryptoData[] = [
  { symbol: 'BTC', name: 'Bitcoin', price: 102651.50, change: -1.32, logo: '₿' },
  { symbol: 'ETH', name: 'Ethereum', price: 3494.28, change: -5.99, logo: 'Ξ' },
  { symbol: 'BNB', name: 'BNB', price: 645.23, change: 2.45, logo: 'Ⓑ' },
  { symbol: 'SOL', name: 'Solana', price: 160.40, change: -8.45, logo: '◎' },
  { symbol: 'XRP', name: 'XRP', price: 2.2550, change: -6.70, logo: '✕' },
  { symbol: 'ADA', name: 'Cardano', price: 0.8945, change: -4.23, logo: '₳' },
];

const Home = () => {
  const [tickerData, setTickerData] = useState(FEATURED_CRYPTOS);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Simulate live price updates
    const interval = setInterval(() => {
      setTickerData(prev => prev.map(crypto => ({
        ...crypto,
        price: crypto.price + (Math.random() - 0.5) * (crypto.price * 0.001),
        change: crypto.change + (Math.random() - 0.5) * 0.5,
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const stats = useMemo(() => [
    { label: 'Trading Volume (24h)', value: '$76.2B', icon: '📊' },
    { label: 'Registered Users', value: '120M+', icon: '👥' },
    { label: 'Countries Supported', value: '180+', icon: '🌍' },
    { label: 'Cryptocurrencies', value: '350+', icon: '💎' },
  ], []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 pt-20 pb-32">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-gray-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-gray-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/5 rounded-full mb-8 animate-fade-in">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-black">Trade with the World's Leading Crypto Exchange</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-black mb-6 animate-slide-down">
              Buy, Trade & Hold
              <span className="block mt-2 bg-gradient-to-r from-gray-900 via-black to-gray-900 bg-clip-text text-transparent">
                350+ Cryptocurrencies
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto animate-slide-up">
              Join millions of traders worldwide. Start your crypto journey with zero fees on your first trade.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in">
              <Link
                href="/auth"
                className="group px-8 py-4 bg-black text-white rounded-xl font-bold text-lg hover:bg-gray-800 transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl flex items-center gap-2"
              >
                Get Started
                <ArrowRightIcon />
              </Link>
              <Link
                href="/markets"
                className="group px-8 py-4 bg-white border-2 border-black text-black rounded-xl font-bold text-lg hover:bg-black hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <PlayIcon />
                Explore Markets
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckIcon />
                <span>Secure & Regulated</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon />
                <span>Low Fees</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Ticker */}
      {isClient && (
        <section className="bg-black text-white py-4 overflow-hidden">
          <div className="flex items-center animate-scroll-left">
            {[...tickerData, ...tickerData].map((crypto, index) => (
              <div key={`${crypto.symbol}-${index}`} className="flex items-center gap-3 px-8 whitespace-nowrap">
                <span className="text-2xl">{crypto.logo}</span>
                <span className="font-bold">{crypto.symbol}</span>
                <span className="text-gray-400">|</span>
                <span className="font-semibold">${crypto.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                <span className={`font-medium ${crypto.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {crypto.change >= 0 ? '+' : ''}{crypto.change.toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:border-black hover:shadow-xl transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-3xl font-bold text-black mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cryptocurrencies */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">Featured Cryptocurrencies</h2>
            <p className="text-lg text-gray-600">Start trading the most popular digital assets</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {tickerData.map((crypto, index) => (
              <Link
                key={crypto.symbol}
                href={`/trade?pair=${crypto.symbol}USDT`}
                className="group bg-white rounded-2xl border border-gray-200 p-6 hover:border-black hover:shadow-2xl transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                      {crypto.logo}
                    </div>
                    <div>
                      <div className="font-bold text-lg text-black">{crypto.symbol}</div>
                      <div className="text-sm text-gray-500">{crypto.name}</div>
                    </div>
                  </div>
                  <TrendingUpIcon />
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-2xl font-bold text-black">
                      ${crypto.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                    <div className={`text-sm font-semibold mt-1 ${crypto.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {crypto.change >= 0 ? '+' : ''}{crypto.change.toFixed(2)}% 24h
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-black text-white rounded-lg font-semibold text-sm group-hover:bg-gray-800 transition-colors">
                    Trade
                  </button>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/markets"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-black text-black rounded-xl font-semibold hover:bg-black hover:text-white transition-all duration-300 hover:scale-105 active:scale-95"
            >
              View All Markets
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Why Choose Us</h2>
            <p className="text-lg text-gray-600">Trade with confidence on the world's most trusted platform</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:border-black hover:shadow-2xl transition-all duration-500 animate-fade-in">
              <div className="w-16 h-16 mx-auto mb-6 bg-black rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                <ShieldIcon />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Secure & Safe</h3>
              <p className="text-gray-600">Industry-leading security with multi-layer protection and cold storage</p>
            </div>

            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:border-black hover:shadow-2xl transition-all duration-500 animate-fade-in" style={{ animationDelay: '100ms' }}>
              <div className="w-16 h-16 mx-auto mb-6 bg-black rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                <LightningIcon />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Lightning Fast</h3>
              <p className="text-gray-600">Execute trades instantly with our high-performance matching engine</p>
            </div>

            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:border-black hover:shadow-2xl transition-all duration-500 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="w-16 h-16 mx-auto mb-6 bg-black rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                <SparklesIcon />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Low Fees</h3>
              <p className="text-gray-600">Enjoy competitive trading fees and zero deposit fees</p>
            </div>

            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:border-black hover:shadow-2xl transition-all duration-500 animate-fade-in" style={{ animationDelay: '300ms' }}>
              <div className="w-16 h-16 mx-auto mb-6 bg-black rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                <GlobeIcon />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Global Access</h3>
              <p className="text-gray-600">Trade from anywhere with support in 180+ countries</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-96 h-96 bg-white rounded-full filter blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full filter blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Start Trading Today
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Join millions of users and experience the future of finance
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/auth"
                className="px-8 py-4 bg-white text-black rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl"
              >
                Create Free Account
              </Link>
              <Link
                href="/markets"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default memo(Home);
