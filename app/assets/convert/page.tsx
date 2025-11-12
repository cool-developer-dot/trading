'use client';

import { memo, useCallback, useMemo, useState, useEffect } from 'react';
import Link from 'next/link';

// Icon Components
const SwapIcon = memo(() => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>
));
SwapIcon.displayName = 'SwapIcon';

const RefreshIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
));
RefreshIcon.displayName = 'RefreshIcon';

const ChevronDownIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
));
ChevronDownIcon.displayName = 'ChevronDownIcon';

const SearchIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
));
SearchIcon.displayName = 'SearchIcon';

const ClockIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
));
ClockIcon.displayName = 'ClockIcon';

const CheckCircleIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
));
CheckCircleIcon.displayName = 'CheckCircleIcon';

const LightningIcon = memo(() => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
  </svg>
));
LightningIcon.displayName = 'LightningIcon';

const ShieldIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
));
ShieldIcon.displayName = 'ShieldIcon';

const TrendingIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
));
TrendingIcon.displayName = 'TrendingIcon';

// Types
interface Asset {
  symbol: string;
  name: string;
  balance: number;
  usdPrice: number;
  icon: string;
}

interface ConversionRate {
  from: string;
  to: string;
  rate: number;
  fee: number;
}

interface RecentConversion {
  id: string;
  from: string;
  to: string;
  fromAmount: number;
  toAmount: number;
  timestamp: Date;
}

// Mock Data
const AVAILABLE_ASSETS: Asset[] = [
  { symbol: 'BTC', name: 'Bitcoin', balance: 0.45823, usdPrice: 42000, icon: '₿' },
  { symbol: 'ETH', name: 'Ethereum', balance: 5.234, usdPrice: 1886, icon: 'Ξ' },
  { symbol: 'BNB', name: 'Binance Coin', balance: 12.45, usdPrice: 278, icon: '◈' },
  { symbol: 'USDT', name: 'Tether', balance: 5000, usdPrice: 1, icon: '₮' },
  { symbol: 'USDC', name: 'USD Coin', balance: 3000, usdPrice: 1, icon: '$' },
  { symbol: 'ADA', name: 'Cardano', balance: 1234.56, usdPrice: 0.37, icon: '₳' },
  { symbol: 'SOL', name: 'Solana', balance: 23.45, usdPrice: 100, icon: '◎' },
  { symbol: 'DOT', name: 'Polkadot', balance: 234.56, usdPrice: 6.21, icon: '●' },
];

const RECENT_CONVERSIONS: RecentConversion[] = [
  { id: '1', from: 'BTC', to: 'ETH', fromAmount: 0.1, toAmount: 2.23, timestamp: new Date('2024-01-15T10:30:00') },
  { id: '2', from: 'USDT', to: 'BNB', fromAmount: 1000, toAmount: 3.6, timestamp: new Date('2024-01-15T09:15:00') },
  { id: '3', from: 'ETH', to: 'USDC', fromAmount: 1, toAmount: 1886, timestamp: new Date('2024-01-14T16:20:00') },
];

const ConvertAssetsPage = () => {
  const [assets] = useState<Asset[]>(AVAILABLE_ASSETS);
  const [recentConversions] = useState<RecentConversion[]>(RECENT_CONVERSIONS);
  
  const [fromAsset, setFromAsset] = useState<Asset>(assets[0]);
  const [toAsset, setToAsset] = useState<Asset>(assets[1]);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [fromSearchQuery, setFromSearchQuery] = useState('');
  const [toSearchQuery, setToSearchQuery] = useState('');
  
  const [isConverting, setIsConverting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [conversionRate, setConversionRate] = useState(0);

  // Calculate conversion rate
  useEffect(() => {
    const rate = toAsset.usdPrice / fromAsset.usdPrice;
    setConversionRate(rate);
    
    if (fromAmount) {
      const convertedAmount = parseFloat(fromAmount) * rate * 0.999; // 0.1% fee
      setToAmount(convertedAmount.toFixed(8));
    }
  }, [fromAsset, toAsset, fromAmount]);

  // Handle from amount change
  const handleFromAmountChange = useCallback((value: string) => {
    setFromAmount(value);
    if (value && !isNaN(parseFloat(value))) {
      const convertedAmount = parseFloat(value) * conversionRate * 0.999;
      setToAmount(convertedAmount.toFixed(8));
    } else {
      setToAmount('');
    }
  }, [conversionRate]);

  // Handle to amount change
  const handleToAmountChange = useCallback((value: string) => {
    setToAmount(value);
    if (value && !isNaN(parseFloat(value)) && conversionRate > 0) {
      const convertedAmount = parseFloat(value) / (conversionRate * 0.999);
      setFromAmount(convertedAmount.toFixed(8));
    } else {
      setFromAmount('');
    }
  }, [conversionRate]);

  // Swap assets
  const handleSwap = useCallback(() => {
    const tempAsset = fromAsset;
    setFromAsset(toAsset);
    setToAsset(tempAsset);
    
    const tempAmount = fromAmount;
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  }, [fromAsset, toAsset, fromAmount, toAmount]);

  // Handle conversion
  const handleConvert = useCallback(() => {
    if (!fromAmount || parseFloat(fromAmount) <= 0 || parseFloat(fromAmount) > fromAsset.balance) {
      alert('Invalid amount');
      return;
    }

    setIsConverting(true);
    
    // Simulate conversion
    setTimeout(() => {
      setIsConverting(false);
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
        setFromAmount('');
        setToAmount('');
      }, 3000);
    }, 1500);
  }, [fromAmount, fromAsset.balance]);

  // Filter assets for dropdowns
  const filteredFromAssets = useMemo(() => {
    return assets.filter(asset =>
      asset.symbol.toLowerCase().includes(fromSearchQuery.toLowerCase()) ||
      asset.name.toLowerCase().includes(fromSearchQuery.toLowerCase())
    );
  }, [assets, fromSearchQuery]);

  const filteredToAssets = useMemo(() => {
    return assets.filter(asset =>
      asset.symbol.toLowerCase().includes(toSearchQuery.toLowerCase()) ||
      asset.name.toLowerCase().includes(toSearchQuery.toLowerCase())
    );
  }, [assets, toSearchQuery]);

  // Calculate conversion details
  const conversionFee = useMemo(() => {
    if (!fromAmount || isNaN(parseFloat(fromAmount))) return 0;
    return parseFloat(fromAmount) * fromAsset.usdPrice * 0.001; // 0.1% fee
  }, [fromAmount, fromAsset.usdPrice]);

  const estimatedValue = useMemo(() => {
    if (!fromAmount || isNaN(parseFloat(fromAmount))) return 0;
    return parseFloat(fromAmount) * fromAsset.usdPrice;
  }, [fromAmount, fromAsset.usdPrice]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-600 via-violet-500 to-indigo-600 overflow-hidden">
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
              <span className="text-white">Convert Assets</span>
            </div>

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white">
                  <SwapIcon />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">Convert Assets</h1>
                  <p className="text-white/80">Instant conversion between cryptocurrencies with the best rates</p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20 flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-white">
                  <LightningIcon />
                </div>
                <div>
                  <p className="text-white font-bold">Instant Conversion</p>
                  <p className="text-white/70 text-sm">Execute trades in seconds</p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20 flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-white">
                  <TrendingIcon />
                </div>
                <div>
                  <p className="text-white font-bold">Best Rates</p>
                  <p className="text-white/70 text-sm">Competitive market prices</p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20 flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-white">
                  <ShieldIcon />
                </div>
                <div>
                  <p className="text-white font-bold">Low Fees</p>
                  <p className="text-white/70 text-sm">Only 0.1% conversion fee</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Conversion Panel */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-black mb-6">Quick Convert</h2>

                {/* From Section */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <button
                        onClick={() => setShowFromDropdown(!showFromDropdown)}
                        className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-300 hover:border-gray-400 transition-all"
                      >
                        <span className="text-2xl">{fromAsset.icon}</span>
                        <div className="text-left">
                          <p className="font-bold text-black">{fromAsset.symbol}</p>
                          <p className="text-xs text-gray-500">{fromAsset.name}</p>
                        </div>
                        <ChevronDownIcon />
                      </button>

                      <div className="text-right">
                        <input
                          type="number"
                          value={fromAmount}
                          onChange={(e) => handleFromAmountChange(e.target.value)}
                          placeholder="0.00"
                          className="w-full text-right text-2xl font-bold bg-transparent border-none outline-none"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <p className="text-gray-500">Balance: {fromAsset.balance.toFixed(8)}</p>
                      <button
                        onClick={() => handleFromAmountChange(fromAsset.balance.toString())}
                        className="text-purple-600 hover:text-purple-700 font-medium"
                      >
                        Max
                      </button>
                    </div>
                  </div>

                  {/* From Dropdown */}
                  {showFromDropdown && (
                    <div className="mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 max-h-96 overflow-y-auto animate-fade-in">
                      <input
                        type="text"
                        value={fromSearchQuery}
                        onChange={(e) => setFromSearchQuery(e.target.value)}
                        placeholder="Search assets..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3 outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <div className="space-y-1">
                        {filteredFromAssets.map((asset) => (
                          <button
                            key={asset.symbol}
                            onClick={() => {
                              setFromAsset(asset);
                              setShowFromDropdown(false);
                              setFromSearchQuery('');
                            }}
                            className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-all"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{asset.icon}</span>
                              <div className="text-left">
                                <p className="font-bold text-black">{asset.symbol}</p>
                                <p className="text-xs text-gray-500">{asset.name}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-black">{asset.balance.toFixed(4)}</p>
                              <p className="text-xs text-gray-500">${(asset.balance * asset.usdPrice).toFixed(2)}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Swap Button */}
                <div className="flex justify-center -my-2 relative z-10">
                  <button
                    onClick={handleSwap}
                    className="p-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all hover:scale-110 hover:rotate-180 duration-300"
                    aria-label="Swap assets"
                  >
                    <SwapIcon />
                  </button>
                </div>

                {/* To Section */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <button
                        onClick={() => setShowToDropdown(!showToDropdown)}
                        className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-300 hover:border-gray-400 transition-all"
                      >
                        <span className="text-2xl">{toAsset.icon}</span>
                        <div className="text-left">
                          <p className="font-bold text-black">{toAsset.symbol}</p>
                          <p className="text-xs text-gray-500">{toAsset.name}</p>
                        </div>
                        <ChevronDownIcon />
                      </button>

                      <div className="text-right">
                        <input
                          type="number"
                          value={toAmount}
                          onChange={(e) => handleToAmountChange(e.target.value)}
                          placeholder="0.00"
                          className="w-full text-right text-2xl font-bold bg-transparent border-none outline-none"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <p className="text-gray-500">Balance: {toAsset.balance.toFixed(8)}</p>
                    </div>
                  </div>

                  {/* To Dropdown */}
                  {showToDropdown && (
                    <div className="mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 max-h-96 overflow-y-auto animate-fade-in">
                      <input
                        type="text"
                        value={toSearchQuery}
                        onChange={(e) => setToSearchQuery(e.target.value)}
                        placeholder="Search assets..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3 outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <div className="space-y-1">
                        {filteredToAssets.map((asset) => (
                          <button
                            key={asset.symbol}
                            onClick={() => {
                              setToAsset(asset);
                              setShowToDropdown(false);
                              setToSearchQuery('');
                            }}
                            className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-all"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{asset.icon}</span>
                              <div className="text-left">
                                <p className="font-bold text-black">{asset.symbol}</p>
                                <p className="text-xs text-gray-500">{asset.name}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-black">{asset.balance.toFixed(4)}</p>
                              <p className="text-xs text-gray-500">${(asset.balance * asset.usdPrice).toFixed(2)}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Conversion Details */}
                <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Conversion Rate</span>
                    <span className="font-medium text-black">
                      1 {fromAsset.symbol} = {conversionRate.toFixed(6)} {toAsset.symbol}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Estimated Value</span>
                    <span className="font-medium text-black">${estimatedValue.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Conversion Fee (0.1%)</span>
                    <span className="font-medium text-black">${conversionFee.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-900 font-bold">You Will Receive</span>
                      <span className="font-bold text-purple-600">
                        {toAmount || '0.00'} {toAsset.symbol}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Convert Button */}
                <button
                  onClick={handleConvert}
                  disabled={!fromAmount || isConverting || parseFloat(fromAmount) <= 0 || parseFloat(fromAmount) > fromAsset.balance}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isConverting ? 'Converting...' : 'Convert Now'}
                </button>
              </div>
            </div>

            {/* Recent Conversions */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <ClockIcon />
                  <h3 className="font-bold text-black">Recent Conversions</h3>
                </div>

                <div className="space-y-3">
                  {recentConversions.length > 0 ? (
                    recentConversions.map((conversion) => (
                      <div key={conversion.id} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-black">{conversion.from}</span>
                            <span className="text-gray-400">→</span>
                            <span className="font-bold text-black">{conversion.to}</span>
                          </div>
                          <CheckCircleIcon />
                        </div>
                        <div className="text-sm text-gray-600 mb-1">
                          {conversion.fromAmount} {conversion.from} → {conversion.toAmount.toFixed(4)} {conversion.to}
                        </div>
                        <p className="text-xs text-gray-500">
                          {conversion.timestamp.toLocaleDateString()} {conversion.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 text-sm">No recent conversions</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Info Card */}
              <div className="mt-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-200">
                <h3 className="font-bold text-black mb-3">Why Convert with Us?</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon />
                    <span>Instant execution at market price</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon />
                    <span>Low 0.1% conversion fee</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon />
                    <span>No hidden charges</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon />
                    <span>Secure and reliable</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center animate-fade-in">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircleIcon />
            </div>
            <h2 className="text-2xl font-bold text-black mb-2">Conversion Successful!</h2>
            <p className="text-gray-600 mb-4">
              Your {fromAsset.symbol} has been converted to {toAsset.symbol}
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="px-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-all"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(ConvertAssetsPage);

