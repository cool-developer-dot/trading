'use client';

import { memo, useCallback, useState, useMemo, useEffect } from 'react';
import Link from 'next/link';

// ==================== TYPES ====================

interface Coin {
  id: string;
  symbol: string;
  name: string;
  basePrice: number;
  high24h: number;
  low24h: number;
  volume24h: string;
  change24h: number;
}

// ==================== ICON COMPONENTS ====================

const BackIcon = memo(() => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
));
BackIcon.displayName = 'BackIcon';

const SearchIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
));
SearchIcon.displayName = 'SearchIcon';

const CloseIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
));
CloseIcon.displayName = 'CloseIcon';

const DropdownIcon = memo(() => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M7 10l5 5 5-5z" />
  </svg>
));
DropdownIcon.displayName = 'DropdownIcon';

const AIIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
));
AIIcon.displayName = 'AIIcon';

const StarIcon = memo(({ filled = false }: { filled?: boolean }) => (
  <svg className="w-5 h-5" fill={filled ? '#fbbf24' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
));
StarIcon.displayName = 'StarIcon';

const ShareIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
  </svg>
));
ShareIcon.displayName = 'ShareIcon';

const BellIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
));
BellIcon.displayName = 'BellIcon';

const MoreIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
  </svg>
));
MoreIcon.displayName = 'MoreIcon';

const GridIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
));
GridIcon.displayName = 'GridIcon';

const ChartIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
  </svg>
));
ChartIcon.displayName = 'ChartIcon';

// Halal Badge Icon
const HalalIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
));
HalalIcon.displayName = 'HalalIcon';

// Shield Icon for Islamic Finance
const ShieldIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
));
ShieldIcon.displayName = 'ShieldIcon';

// ==================== COIN DATA ====================

const AVAILABLE_COINS: Coin[] = [
  { id: '1', symbol: 'BTC', name: 'Bitcoin', basePrice: 102651.50, high24h: 104842.63, low24h: 98944.36, volume24h: '5.32B', change24h: -1.32 },
  { id: '2', symbol: 'ETH', name: 'Ethereum', basePrice: 3494.28, high24h: 3645.32, low24h: 3401.23, volume24h: '2.18B', change24h: -5.99 },
  { id: '3', symbol: 'BNB', name: 'Binance Coin', basePrice: 645.23, high24h: 658.45, low24h: 632.12, volume24h: '892M', change24h: 2.45 },
  { id: '4', symbol: 'SOL', name: 'Solana', basePrice: 160.40, high24h: 172.45, low24h: 158.23, volume24h: '1.45B', change24h: -8.45 },
  { id: '5', symbol: 'XRP', name: 'Ripple', basePrice: 2.2550, high24h: 2.38, low24h: 2.19, volume24h: '3.21B', change24h: -6.70 },
  { id: '6', symbol: 'ADA', name: 'Cardano', basePrice: 0.8945, high24h: 0.92, low24h: 0.87, volume24h: '654M', change24h: -4.23 },
  { id: '7', symbol: 'AVAX', name: 'Avalanche', basePrice: 35.67, high24h: 36.12, low24h: 34.89, volume24h: '456M', change24h: 0.62 },
  { id: '8', symbol: 'DOGE', name: 'Dogecoin', basePrice: 0.16226, high24h: 0.17, low24h: 0.155, volume24h: '1.87B', change24h: -6.88 },
  { id: '9', symbol: 'DOT', name: 'Polkadot', basePrice: 7.234, high24h: 7.45, low24h: 7.01, volume24h: '234M', change24h: 0.61 },
  { id: '10', symbol: 'MATIC', name: 'Polygon', basePrice: 0.9123, high24h: 0.93, low24h: 0.89, volume24h: '567M', change24h: 0.25 },
  { id: '11', symbol: 'LINK', name: 'Chainlink', basePrice: 23.45, high24h: 23.89, low24h: 22.98, volume24h: '345M', change24h: 0.95 },
  { id: '12', symbol: 'UNI', name: 'Uniswap', basePrice: 12.345, high24h: 12.67, low24h: 11.98, volume24h: '289M', change24h: 1.86 },
  { id: '13', symbol: 'ATOM', name: 'Cosmos', basePrice: 9.876, high24h: 10.12, low24h: 9.56, volume24h: '198M', change24h: 1.29 },
  { id: '14', symbol: 'LTC', name: 'Litecoin', basePrice: 98.234, high24h: 99.45, low24h: 96.78, volume24h: '421M', change24h: 0.80 },
  { id: '15', symbol: 'TRX', name: 'TRON', basePrice: 0.2456, high24h: 0.25, low24h: 0.238, volume24h: '876M', change24h: 2.13 },
];

// ==================== COIN SELECTOR COMPONENT ====================

interface CoinSelectorProps {
  selectedCoin: Coin;
  onSelectCoin: (coin: Coin) => void;
  isOpen: boolean;
  onClose: () => void;
}

const CoinSelector = memo(({ selectedCoin, onSelectCoin, isOpen, onClose }: CoinSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCoins = useMemo(() => {
    if (!searchQuery.trim()) return AVAILABLE_COINS;
    const query = searchQuery.toLowerCase();
    return AVAILABLE_COINS.filter(
      coin =>
        coin.symbol.toLowerCase().includes(query) ||
        coin.name.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleSelectCoin = useCallback((coin: Coin) => {
    onSelectCoin(coin);
    setSearchQuery('');
    onClose();
  }, [onSelectCoin, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-black">Select Trading Pair</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <CloseIcon />
            </button>
          </div>
          {/* Search */}
          <div className="relative">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search coin..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-lg text-black placeholder-gray-400 focus:ring-2 focus:ring-black focus:bg-white transition-all outline-none text-sm"
              autoFocus
            />
          </div>
        </div>

        {/* Coin List */}
        <div className="flex-1 overflow-y-auto">
          {filteredCoins.length > 0 ? (
            filteredCoins.map((coin) => (
              <button
                key={coin.id}
                onClick={() => handleSelectCoin(coin)}
                className={`w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-100 ${
                  selectedCoin.id === coin.id ? 'bg-yellow-50' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white font-bold">
                    {coin.symbol.substring(0, 2)}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-black">{coin.symbol}/USDT</div>
                    <div className="text-xs text-gray-500">{coin.name}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-black">${coin.basePrice.toLocaleString()}</div>
                  <div className={`text-xs font-medium ${coin.change24h >= 0 ? 'text-[#0ecb81]' : 'text-[#f6465d]'}`}>
                    {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <SearchIcon />
              <p className="text-gray-500 text-sm mt-2">No coins found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
CoinSelector.displayName = 'CoinSelector';

// ==================== MAIN TRADING PAGE ====================

const TradePage = () => {
  const [activeTab, setActiveTab] = useState('Price');
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTimeframe, setActiveTimeframe] = useState('1h');
  const [activeIndicator, setActiveIndicator] = useState('MA');
  const [activeOrderTab, setActiveOrderTab] = useState('Order Book');
  const [selectedCoin, setSelectedCoin] = useState<Coin>(AVAILABLE_COINS[0]);
  const [isCoinSelectorOpen, setIsCoinSelectorOpen] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(selectedCoin.basePrice);
  const [priceChange, setPriceChange] = useState(selectedCoin.change24h);
  const [buyAmount, setBuyAmount] = useState('');
  const [sellAmount, setSellAmount] = useState('');
  const [buyPrice, setBuyPrice] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [chartData, setChartData] = useState<Array<{ height: number; isGreen: boolean }>>([]);
  const [orderBookData, setOrderBookData] = useState<Array<{ bid: number; ask: number }>>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Generate chart and order book data on client side only
  useEffect(() => {
    setIsMounted(true);
    // Generate chart data
    const newChartData = Array.from({ length: 30 }).map(() => ({
      height: 20 + Math.random() * 80,
      isGreen: Math.random() > 0.5,
    }));
    setChartData(newChartData);

    // Generate order book data
    const newOrderBookData = Array.from({ length: 8 }).map(() => ({
      bid: Math.random() * 2,
      ask: Math.random() * 2,
    }));
    setOrderBookData(newOrderBookData);
  }, []);

  // Update price when coin changes
  useEffect(() => {
    setCurrentPrice(selectedCoin.basePrice);
    setPriceChange(selectedCoin.change24h);
  }, [selectedCoin]);

  // Simulate price updates
  useEffect(() => {
    const interval = setInterval(() => {
      const change = (Math.random() - 0.5) * (selectedCoin.basePrice * 0.001);
      setCurrentPrice(prev => Math.max(prev + change, selectedCoin.basePrice * 0.9));
      setPriceChange((Math.random() - 0.5) * 5);

      // Update order book data
      const newOrderBookData = Array.from({ length: 8 }).map(() => ({
        bid: Math.random() * 2,
        ask: Math.random() * 2,
      }));
      setOrderBookData(newOrderBookData);
    }, 3000);
    return () => clearInterval(interval);
  }, [selectedCoin]);

  const handleCoinSelect = useCallback((coin: Coin) => {
    setSelectedCoin(coin);
    setBuyPrice('');
    setSellPrice('');
    setBuyAmount('');
    setSellAmount('');
  }, []);

  const openCoinSelector = useCallback(() => {
    setIsCoinSelectorOpen(true);
  }, []);

  const closeCoinSelector = useCallback(() => {
    setIsCoinSelectorOpen(false);
  }, []);

  const tabs = useMemo(() => ['Price', 'Info', 'Islamic Finance', 'Halal Trading'], []);
  const timeframes = useMemo(() => ['15m', '1h', '4h', '1D', 'More'], []);
  const indicators = useMemo(() => ['MA', 'EMA', 'BOLL', 'SAR', 'AVL', 'VOL', 'MACD', 'RSI'], []);
  const periods = useMemo(() => [
    { label: 'Today', change: 1.32 },
    { label: '7 Days', change: -10.78 },
    { label: '30 Days', change: -16.56 },
    { label: '90 Days', change: -11.06 },
    { label: '180 Days', change: 1.30 },
    { label: '1 Year', change: 51.72 },
  ], []);

  const handleBuy = useCallback(() => {
    if (!buyAmount || !buyPrice) {
      alert('Please enter amount and price');
      return;
    }
    const total = parseFloat(buyAmount) * parseFloat(buyPrice);
    alert(`✅ Halal Spot Buy Order Placed!\n\n🪙 Coin: ${selectedCoin.symbol}/USDT\n📊 Amount: ${buyAmount} ${selectedCoin.symbol}\n💰 Price: $${buyPrice}\n💵 Total: $${total.toFixed(2)}\n\n✓ 100% Sharia Compliant\n✓ No Interest (Riba)\n✓ No Leverage\n✓ Direct Ownership`);
    setBuyAmount('');
    setBuyPrice('');
  }, [buyAmount, buyPrice, selectedCoin]);

  const handleSell = useCallback(() => {
    if (!sellAmount || !sellPrice) {
      alert('Please enter amount and price');
      return;
    }
    const total = parseFloat(sellAmount) * parseFloat(sellPrice);
    alert(`✅ Halal Spot Sell Order Placed!\n\n🪙 Coin: ${selectedCoin.symbol}/USDT\n📊 Amount: ${sellAmount} ${selectedCoin.symbol}\n💰 Price: $${sellPrice}\n💵 Total: $${total.toFixed(2)}\n\n✓ 100% Sharia Compliant\n✓ No Interest (Riba)\n✓ No Leverage\n✓ Direct Ownership`);
    setSellAmount('');
    setSellPrice('');
  }, [sellAmount, sellPrice, selectedCoin]);

  const handleMarketBuy = useCallback(() => {
    alert(`✅ Halal Market Buy Order!\n\n🪙 Coin: ${selectedCoin.symbol}/USDT\n💰 Current Price: $${currentPrice.toFixed(2)}\n\n✓ Instant Execution\n✓ 100% Sharia Compliant\n✓ No Interest (Riba)\n✓ Spot Trading Only`);
  }, [currentPrice, selectedCoin]);

  const handleMarketSell = useCallback(() => {
    alert(`✅ Halal Market Sell Order!\n\n🪙 Coin: ${selectedCoin.symbol}/USDT\n💰 Current Price: $${currentPrice.toFixed(2)}\n\n✓ Instant Execution\n✓ 100% Sharia Compliant\n✓ No Interest (Riba)\n✓ Spot Trading Only`);
  }, [currentPrice, selectedCoin]);

  const formattedPrice = useMemo(() => currentPrice.toFixed(2), [currentPrice]);
  const inrPrice = useMemo(() => (currentPrice * 83).toFixed(2), [currentPrice]);

  return (
    <div className="min-h-screen bg-white">
      {/* Coin Selector Modal */}
      <CoinSelector
        selectedCoin={selectedCoin}
        onSelectCoin={handleCoinSelect}
        isOpen={isCoinSelectorOpen}
        onClose={closeCoinSelector}
      />

      {/* Trading Header */}
      <div className="sticky top-[56px] z-40 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left: Back and Pair */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <BackIcon />
            </Link>
            <button 
              onClick={openCoinSelector}
              className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="font-bold text-lg text-black">{selectedCoin.symbol}/USDT</span>
              <DropdownIcon />
            </button>
          </div>

          {/* Right: Icons */}
          <div className="flex items-center space-x-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-blue-500">
              <AIIcon />
            </button>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <StarIcon filled={isFavorite} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ShareIcon />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
              <BellIcon />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-between px-4 border-t border-gray-100">
          <div className="flex items-center">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab ? 'text-black' : 'text-gray-500 hover:text-black'
                }`}
              >
                {tab}
                {(tab === 'Islamic Finance' || tab === 'Halal Trading') && (
                  <span className="absolute -top-1 -right-1 bg-green-500 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
                    ✓
                  </span>
                )}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
                )}
              </button>
            ))}
          </div>
          
          {/* Halal Certification Badge */}
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-green-50 border border-green-500 rounded-lg">
            <ShieldIcon />
            <span className="text-xs font-semibold text-green-700">100% Halal Certified</span>
          </div>
        </div>
      </div>

      {/* Islamic Finance Notice */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-y border-green-200 py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-green-500 rounded-full">
              <HalalIcon />
            </div>
            <div>
              <div className="text-sm font-bold text-green-800">Sharia-Compliant Spot Trading Only</div>
              <div className="text-xs text-green-700">No Interest (Riba) • No Gambling (Maysir) • No Uncertainty (Gharar)</div>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-2 px-4 py-2 bg-white border-2 border-green-500 rounded-lg">
            <ShieldIcon />
            <span className="text-sm font-bold text-green-700">Halal Certified ✓</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-4">
        {/* Price Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Left: Current Price */}
          <div>
            <div className="text-4xl font-bold text-black mb-2">
              {formattedPrice}
            </div>
            <div className="flex items-center space-x-4 mb-3">
              <span className={`text-lg font-semibold ${priceChange >= 0 ? 'text-[#0ecb81]' : 'text-[#f6465d]'}`}>
                ₹{inrPrice}
              </span>
              <span className={`text-sm font-medium ${priceChange >= 0 ? 'text-[#0ecb81]' : 'text-[#f6465d]'}`}>
                {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
              </span>
            </div>
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-1 text-green-600">
                <HalalIcon />
                <span className="font-semibold">Spot Trading</span>
              </div>
              <button className="text-green-600 hover:underline font-medium">Halal Compliance</button>
              <button className="text-green-600 hover:underline font-medium">Sharia Guidelines</button>
            </div>
          </div>

          {/* Right: 24h Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-500 mb-1">24h High</div>
              <div className="text-sm font-semibold text-black">{selectedCoin.high24h.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">24h Vol({selectedCoin.symbol})</div>
              <div className="text-sm font-semibold text-black">{(parseFloat(selectedCoin.volume24h) / 1000).toFixed(2)}K</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">24h Low</div>
              <div className="text-sm font-semibold text-black">{selectedCoin.low24h.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">24h Vol(USDT)</div>
              <div className="text-sm font-semibold text-black">{selectedCoin.volume24h}</div>
            </div>
          </div>
        </div>

        {/* Chart Controls */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
          <div className="flex items-center space-x-4">
            <span className="text-xs text-gray-500">Time</span>
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => setActiveTimeframe(tf)}
                className={`px-3 py-1.5 text-xs rounded transition-colors ${
                  activeTimeframe === tf
                    ? 'bg-yellow-100 text-yellow-700 font-semibold'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-3">
            <button className="text-xs text-gray-600 hover:text-black">Depth</button>
            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
              <GridIcon />
            </button>
          </div>
        </div>

        {/* Moving Averages */}
        <div className="flex items-center space-x-4 mb-4 text-xs overflow-x-auto">
          <span className="text-yellow-500">MA(7): 102,193.52</span>
          <span className="text-pink-500">MA(25): 101,898.86</span>
          <span className="text-purple-500">MA(99): 101,831.37</span>
        </div>

        {/* Chart Area - Placeholder */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 min-h-[400px] relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <ChartIcon />
              <div className="text-gray-400 text-sm mt-2">Trading Chart</div>
              <div className="text-gray-400 text-xs">Price: ${formattedPrice}</div>
              <div className={`text-xs font-semibold mt-1 ${priceChange >= 0 ? 'text-[#0ecb81]' : 'text-[#f6465d]'}`}>
                {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
              </div>
            </div>
          </div>
          {/* Simulated candlestick visual */}
          {isMounted && chartData.length > 0 && (
            <div className="absolute bottom-4 left-4 right-4 h-12 flex items-end justify-between opacity-20">
              {chartData.map((data, i) => (
                <div
                  key={i}
                  className={`w-2 rounded-t ${data.isGreen ? 'bg-[#0ecb81]' : 'bg-[#f6465d]'}`}
                  style={{ height: `${data.height}%` }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Technical Indicators */}
        <div className="flex items-center space-x-2 mb-6 pb-4 border-b border-gray-100 overflow-x-auto">
          {indicators.map((indicator) => (
            <button
              key={indicator}
              onClick={() => setActiveIndicator(indicator)}
              className={`px-4 py-2 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                activeIndicator === indicator
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {indicator}
            </button>
          ))}
          <button className="p-2 hover:bg-gray-100 rounded transition-colors">
            <MoreIcon />
          </button>
        </div>

        {/* Time Periods */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-6">
          {periods.map((period) => (
            <div
              key={period.label}
              className="bg-white border border-gray-200 rounded-lg p-3 hover:border-black transition-colors cursor-pointer"
            >
              <div className="text-xs text-gray-600 mb-1">{period.label}</div>
              <div className={`text-sm font-semibold ${period.change >= 0 ? 'text-[#0ecb81]' : 'text-[#f6465d]'}`}>
                {period.change >= 0 ? '+' : ''}{period.change}%
              </div>
            </div>
          ))}
        </div>

        {/* Order Book Section */}
        <div className="bg-white border border-gray-200 rounded-lg mb-6">
          <div className="flex items-center border-b border-gray-100">
            {['Order Book', 'Trades', 'Network'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveOrderTab(tab)}
                className={`px-6 py-3 text-sm font-medium transition-colors relative ${
                  activeOrderTab === tab ? 'text-black' : 'text-gray-500 hover:text-black'
                }`}
              >
                {tab}
                {activeOrderTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
                )}
              </button>
            ))}
          </div>

          <div className="p-4">
            {/* Buy/Sell Percentage Bar */}
            <div className="flex items-center mb-4">
              <div className="flex-1 h-2 bg-[#0ecb81] rounded-l" style={{ width: '74.47%' }} />
              <div className="flex-1 h-2 bg-[#f6465d] rounded-r" style={{ width: '25.53%' }} />
            </div>
            <div className="flex items-center justify-between text-xs mb-4">
              <span className="text-[#0ecb81] font-semibold">74.47%</span>
              <span className="text-[#f6465d] font-semibold">25.53%</span>
            </div>

            {/* Bid/Ask Headers */}
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div className="text-xs font-medium text-gray-600">Bid</div>
              <div className="text-xs font-medium text-gray-600 text-right">
                <span>Ask</span>
                <button className="ml-2 text-black">
                  0.01 <DropdownIcon />
                </button>
              </div>
            </div>

            {/* Sample Order Book Data */}
            <div className="grid grid-cols-2 gap-4">
              {/* Bids */}
              <div className="space-y-1">
                {isMounted && orderBookData.length > 0 ? (
                  orderBookData.map((data, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <span className="text-[#0ecb81]">{(currentPrice - i * 10).toFixed(2)}</span>
                      <span className="text-gray-600">{data.bid.toFixed(4)}</span>
                    </div>
                  ))
                ) : (
                  Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <span className="text-[#0ecb81]">{(currentPrice - i * 10).toFixed(2)}</span>
                      <span className="text-gray-600">0.0000</span>
                    </div>
                  ))
                )}
              </div>
              {/* Asks */}
              <div className="space-y-1">
                {isMounted && orderBookData.length > 0 ? (
                  orderBookData.map((data, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <span className="text-[#f6465d]">{(currentPrice + i * 10).toFixed(2)}</span>
                      <span className="text-gray-600">{data.ask.toFixed(4)}</span>
                    </div>
                  ))
                ) : (
                  Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <span className="text-[#f6465d]">{(currentPrice + i * 10).toFixed(2)}</span>
                      <span className="text-gray-600">0.0000</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Trading Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Buy Panel */}
          <div className="bg-white border-2 border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="text-lg font-semibold text-black">Buy {selectedCoin.symbol}</div>
              <div className="flex items-center space-x-1 px-2 py-1 bg-green-50 border border-green-500 rounded-full">
                <HalalIcon />
                <span className="text-xs font-bold text-green-700">Halal</span>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Price (USDT)</label>
                <input
                  type="number"
                  value={buyPrice}
                  onChange={(e) => setBuyPrice(e.target.value)}
                  placeholder={formattedPrice}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0ecb81] focus:border-transparent outline-none text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Amount ({selectedCoin.symbol})</label>
                <input
                  type="number"
                  value={buyAmount}
                  onChange={(e) => setBuyAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0ecb81] focus:border-transparent outline-none text-sm"
                />
              </div>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>Total</span>
                <span>{buyAmount && buyPrice ? (parseFloat(buyAmount) * parseFloat(buyPrice)).toFixed(2) : '0.00'} USDT</span>
              </div>
              <button
                onClick={handleBuy}
                className="w-full py-3 bg-[#0ecb81] hover:bg-[#0bb871] text-white font-semibold rounded-lg transition-colors"
              >
                Buy {selectedCoin.symbol}
              </button>
              <button
                onClick={handleMarketBuy}
                className="w-full py-2 border border-[#0ecb81] text-[#0ecb81] hover:bg-[#0ecb81]/10 font-medium rounded-lg transition-colors text-sm"
              >
                Market Buy
              </button>
            </div>
          </div>

          {/* Sell Panel */}
          <div className="bg-white border-2 border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="text-lg font-semibold text-black">Sell {selectedCoin.symbol}</div>
              <div className="flex items-center space-x-1 px-2 py-1 bg-green-50 border border-green-500 rounded-full">
                <HalalIcon />
                <span className="text-xs font-bold text-green-700">Halal</span>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Price (USDT)</label>
                <input
                  type="number"
                  value={sellPrice}
                  onChange={(e) => setSellPrice(e.target.value)}
                  placeholder={formattedPrice}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f6465d] focus:border-transparent outline-none text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Amount ({selectedCoin.symbol})</label>
                <input
                  type="number"
                  value={sellAmount}
                  onChange={(e) => setSellAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f6465d] focus:border-transparent outline-none text-sm"
                />
              </div>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>Total</span>
                <span>{sellAmount && sellPrice ? (parseFloat(sellAmount) * parseFloat(sellPrice)).toFixed(2) : '0.00'} USDT</span>
              </div>
              <button
                onClick={handleSell}
                className="w-full py-3 bg-[#f6465d] hover:bg-[#e63946] text-white font-semibold rounded-lg transition-colors"
              >
                Sell {selectedCoin.symbol}
              </button>
              <button
                onClick={handleMarketSell}
                className="w-full py-2 border border-[#f6465d] text-[#f6465d] hover:bg-[#f6465d]/10 font-medium rounded-lg transition-colors text-sm"
              >
                Market Sell
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Fixed Action Bar - Halal Trading */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-green-500 p-4 z-40">
        <div className="max-w-7xl mx-auto">
          {/* Halal Badge */}
          <div className="flex items-center justify-center mb-2">
            <div className="flex items-center space-x-2 px-3 py-1 bg-green-50 border border-green-500 rounded-full">
              <ShieldIcon />
              <span className="text-xs font-bold text-green-700">100% Halal Spot Trading</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/markets"
              className="flex flex-col items-center justify-center px-4 py-2 hover:bg-green-50 rounded-lg transition-colors"
            >
              <MoreIcon />
              <span className="text-xs text-gray-600 mt-1">Markets</span>
            </Link>
            <Link
              href="/"
              className="flex flex-col items-center justify-center px-4 py-2 hover:bg-green-50 rounded-lg transition-colors"
            >
              <GridIcon />
              <span className="text-xs text-gray-600 mt-1">Home</span>
            </Link>
            <Link
              href="/trade"
              className="flex flex-col items-center justify-center px-4 py-2 hover:bg-green-50 rounded-lg transition-colors"
            >
              <HalalIcon />
              <span className="text-xs text-green-600 mt-1 font-semibold">Halal</span>
            </Link>
            <button
              onClick={handleMarketBuy}
              className="flex-1 py-4 bg-[#0ecb81] hover:bg-[#0bb871] text-white font-bold text-lg rounded-lg transition-colors shadow-lg"
            >
              Buy (Halal)
            </button>
            <button
              onClick={handleMarketSell}
              className="flex-1 py-4 bg-[#f6465d] hover:bg-[#e63946] text-white font-bold text-lg rounded-lg transition-colors shadow-lg"
            >
              Sell (Halal)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(TradePage);

