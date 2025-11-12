'use client';

import { memo, useCallback, useMemo, useState, useEffect } from 'react';
import Link from 'next/link';

// Icon Components
const ChartIcon = memo(() => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
));
ChartIcon.displayName = 'ChartIcon';

const FireIcon = memo(() => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 23C7.589 23 4 19.411 4 15c0-3.518 2.614-6.432 6-6.92V6a1 1 0 011.993-.117l.007.127v2.08c3.386.488 6 3.402 6 6.92 0 4.411-3.589 8-8 8zm0-2a6 6 0 100-12 6 6 0 000 12z" />
  </svg>
));
FireIcon.displayName = 'FireIcon';

const LockIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
));
LockIcon.displayName = 'LockIcon';

const SearchIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
));
SearchIcon.displayName = 'SearchIcon';

const StarIcon = memo(() => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
));
StarIcon.displayName = 'StarIcon';

const ClockIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
));
ClockIcon.displayName = 'ClockIcon';

const TrendingIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
));
TrendingIcon.displayName = 'TrendingIcon';

const ShieldIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
));
ShieldIcon.displayName = 'ShieldIcon';

// Types
interface StakingProduct {
  id: string;
  asset: string;
  name: string;
  apy: number;
  duration: number; // days
  minAmount: number;
  type: 'flexible' | 'locked' | 'defi';
  risk: 'low' | 'medium' | 'high';
  totalStaked: number;
  userStaked?: number;
  icon: string;
  isPopular?: boolean;
}

// Mock Data
const STAKING_PRODUCTS: StakingProduct[] = [
  { id: '1', asset: 'BTC', name: 'Bitcoin Staking', apy: 5.2, duration: 0, minAmount: 0.001, type: 'flexible', risk: 'low', totalStaked: 45000000, icon: '₿', isPopular: true },
  { id: '2', asset: 'ETH', name: 'Ethereum 2.0 Staking', apy: 6.8, duration: 0, minAmount: 0.01, type: 'flexible', risk: 'low', totalStaked: 28000000, icon: 'Ξ', isPopular: true },
  { id: '3', asset: 'BNB', name: 'BNB Locked Staking', apy: 12.5, duration: 30, minAmount: 1, type: 'locked', risk: 'low', totalStaked: 15000000, icon: '◈' },
  { id: '4', asset: 'ADA', name: 'Cardano Staking', apy: 8.3, duration: 0, minAmount: 10, type: 'flexible', risk: 'low', totalStaked: 3200000, icon: '₳', isPopular: true },
  { id: '5', asset: 'SOL', name: 'Solana High Yield', apy: 15.7, duration: 90, minAmount: 1, type: 'locked', risk: 'medium', totalStaked: 5600000, icon: '◎' },
  { id: '6', asset: 'DOT', name: 'Polkadot DeFi Pool', apy: 18.2, duration: 60, minAmount: 5, type: 'defi', risk: 'medium', totalStaked: 2100000, icon: '●' },
  { id: '7', asset: 'MATIC', name: 'Polygon Super Staking', apy: 22.5, duration: 120, minAmount: 100, type: 'locked', risk: 'high', totalStaked: 1800000, icon: '⬡' },
  { id: '8', asset: 'AVAX', name: 'Avalanche DeFi', apy: 25.8, duration: 90, minAmount: 10, type: 'defi', risk: 'high', totalStaked: 980000, icon: '🔺' },
];

const EarnRewardsPage = () => {
  const [products] = useState<StakingProduct[]>(STAKING_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | StakingProduct['type']>('all');
  const [selectedRisk, setSelectedRisk] = useState<'all' | StakingProduct['risk']>('all');
  const [sortBy, setSortBy] = useState<'apy' | 'popular' | 'minAmount'>('apy');
  const [showStakeModal, setShowStakeModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<StakingProduct | null>(null);
  const [stakeAmount, setStakeAmount] = useState('');

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        product =>
          product.asset.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(product => product.type === selectedType);
    }

    // Risk filter
    if (selectedRisk !== 'all') {
      filtered = filtered.filter(product => product.risk === selectedRisk);
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'apy':
          return b.apy - a.apy;
        case 'popular':
          if (a.isPopular && !b.isPopular) return -1;
          if (!a.isPopular && b.isPopular) return 1;
          return b.totalStaked - a.totalStaked;
        case 'minAmount':
          return a.minAmount - b.minAmount;
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, searchQuery, selectedType, selectedRisk, sortBy]);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleStakeClick = useCallback((product: StakingProduct) => {
    setSelectedProduct(product);
    setShowStakeModal(true);
  }, []);

  const handleStake = useCallback(() => {
    if (selectedProduct && parseFloat(stakeAmount) >= selectedProduct.minAmount) {
      alert(`Staking ${stakeAmount} ${selectedProduct.asset} - Feature coming soon!`);
      setShowStakeModal(false);
      setStakeAmount('');
    }
  }, [selectedProduct, stakeAmount]);

  const getRiskColor = useCallback((risk: StakingProduct['risk']) => {
    switch (risk) {
      case 'low':
        return 'text-green-600 bg-green-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'high':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  }, []);

  const getTypeIcon = useCallback((type: StakingProduct['type']) => {
    switch (type) {
      case 'flexible':
        return <ClockIcon />;
      case 'locked':
        return <LockIcon />;
      case 'defi':
        return <TrendingIcon />;
      default:
        return null;
    }
  }, []);

  // Calculate total earnings potential
  const totalEarnings = useMemo(() => {
    return products.reduce((sum, product) => {
      if (product.userStaked) {
        return sum + (product.userStaked * product.apy / 100);
      }
      return sum;
    }, 0);
  }, [products]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 via-emerald-500 to-teal-600 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full filter blur-3xl animate-blob" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-white rounded-full filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-white rounded-full filter blur-3xl animate-blob animation-delay-4000" />
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-white/70 text-sm mb-6">
              <Link href="/assets" className="hover:text-white transition-colors">Assets</Link>
              <span>/</span>
              <span className="text-white">Earn Rewards</span>
            </div>

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white">
                  <ChartIcon />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">Earn Rewards</h1>
                  <p className="text-white/80">Stake your crypto and earn passive income with competitive APY rates</p>
                </div>
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-2 text-white/70 text-sm mb-2">
                  <ChartIcon />
                  <span>Available Products</span>
                </div>
                <p className="text-3xl font-bold text-white">{filteredProducts.length}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-2 text-white/70 text-sm mb-2">
                  <TrendingIcon />
                  <span>Highest APY</span>
                </div>
                <p className="text-3xl font-bold text-white">
                  {Math.max(...filteredProducts.map(p => p.apy)).toFixed(1)}%
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-2 text-white/70 text-sm mb-2">
                  <LockIcon />
                  <span>Total Staked</span>
                </div>
                <p className="text-3xl font-bold text-white">
                  ${(products.reduce((sum, p) => sum + p.totalStaked, 0) / 1000000).toFixed(0)}M
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-2 text-white/70 text-sm mb-2">
                  <ShieldIcon />
                  <span>Your Earnings</span>
                </div>
                <p className="text-3xl font-bold text-white">
                  ${totalEarnings.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Controls Bar */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-6">
            {/* Search */}
            <div className="flex flex-col lg:flex-row items-center gap-4 mb-4">
              <div className="flex-1 relative w-full">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <SearchIcon />
                </div>
                <input
                  type="text"
                  placeholder="Search staking products..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Sort */}
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setSortBy('apy')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    sortBy === 'apy' ? 'bg-white text-black shadow-sm' : 'text-gray-600 hover:text-black'
                  }`}
                >
                  Highest APY
                </button>
                <button
                  onClick={() => setSortBy('popular')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    sortBy === 'popular' ? 'bg-white text-black shadow-sm' : 'text-gray-600 hover:text-black'
                  }`}
                >
                  Popular
                </button>
                <button
                  onClick={() => setSortBy('minAmount')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    sortBy === 'minAmount' ? 'bg-white text-black shadow-sm' : 'text-gray-600 hover:text-black'
                  }`}
                >
                  Low Entry
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Type:</span>
                {(['all', 'flexible', 'locked', 'defi'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedType === type ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm font-medium text-gray-700">Risk:</span>
                {(['all', 'low', 'medium', 'high'] as const).map((risk) => (
                  <button
                    key={risk}
                    onClick={() => setSelectedRisk(risk)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedRisk === risk ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {risk.charAt(0).toUpperCase() + risk.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                        {product.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-black">{product.asset}</h3>
                        <p className="text-sm text-gray-500">{product.name}</p>
                      </div>
                    </div>
                    {product.isPopular && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-xs font-bold">
                        <FireIcon />
                        Hot
                      </div>
                    )}
                  </div>

                  {/* APY - Large Display */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-4">
                    <p className="text-sm text-gray-600 mb-1">Annual Percentage Yield</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-4xl font-bold text-green-600">{product.apy}%</p>
                      <p className="text-sm text-gray-500">APY</p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Type</span>
                      <div className="flex items-center gap-2 text-sm font-medium text-black">
                        {getTypeIcon(product.type)}
                        <span className="capitalize">{product.type}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Duration</span>
                      <span className="text-sm font-medium text-black">
                        {product.duration === 0 ? 'Flexible' : `${product.duration} days`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Min. Amount</span>
                      <span className="text-sm font-medium text-black">
                        {product.minAmount} {product.asset}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Risk Level</span>
                      <span className={`text-xs font-bold px-2 py-1 rounded capitalize ${getRiskColor(product.risk)}`}>
                        {product.risk}
                      </span>
                    </div>
                  </div>

                  {/* Total Staked */}
                  <div className="border-t border-gray-100 pt-4 mb-4">
                    <p className="text-xs text-gray-500 mb-1">Total Staked</p>
                    <p className="text-sm font-bold text-black">
                      ${product.totalStaked.toLocaleString('en-US')}
                    </p>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => handleStakeClick(product)}
                    className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 hover:scale-105"
                  >
                    Stake Now
                  </button>
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SearchIcon />
                </div>
                <p className="text-gray-500 font-medium">No staking products found</p>
                <p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p>
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="mt-12 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
            <h2 className="text-2xl font-bold text-black mb-4">Why Stake with Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-white mb-3">
                  <ShieldIcon />
                </div>
                <h3 className="font-bold text-black mb-2">Secure & Trusted</h3>
                <p className="text-sm text-gray-600">Industry-leading security measures to protect your assets</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-white mb-3">
                  <TrendingIcon />
                </div>
                <h3 className="font-bold text-black mb-2">Competitive Rates</h3>
                <p className="text-sm text-gray-600">Best-in-class APY rates across multiple cryptocurrencies</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-white mb-3">
                  <ClockIcon />
                </div>
                <h3 className="font-bold text-black mb-2">Flexible Options</h3>
                <p className="text-sm text-gray-600">Choose between flexible and locked staking based on your needs</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stake Modal */}
      {showStakeModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 animate-fade-in">
            <h2 className="text-2xl font-bold text-black mb-4">Stake {selectedProduct.asset}</h2>
            <p className="text-gray-600 mb-6">{selectedProduct.name}</p>

            {/* APY Display */}
            <div className="bg-green-50 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-600 mb-1">You will earn</p>
              <p className="text-3xl font-bold text-green-600">{selectedProduct.apy}% APY</p>
            </div>

            {/* Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount to stake
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                  placeholder={`Min. ${selectedProduct.minAmount}`}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                  {selectedProduct.asset}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Minimum: {selectedProduct.minAmount} {selectedProduct.asset}
              </p>
            </div>

            {/* Details */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Duration</span>
                <span className="font-medium text-black">
                  {selectedProduct.duration === 0 ? 'Flexible' : `${selectedProduct.duration} days`}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Est. Annual Earnings</span>
                <span className="font-medium text-green-600">
                  {stakeAmount ? (parseFloat(stakeAmount) * selectedProduct.apy / 100).toFixed(4) : '0'} {selectedProduct.asset}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowStakeModal(false)}
                className="flex-1 py-3 border border-gray-300 text-black rounded-xl font-bold hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleStake}
                disabled={!stakeAmount || parseFloat(stakeAmount) < selectedProduct.minAmount}
                className="flex-1 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm Stake
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default memo(EarnRewardsPage);

