'use client';

import { memo, useState, useCallback, useMemo, useEffect } from 'react';
import Link from 'next/link';

// Icon Components
const ArrowLeftIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
));
ArrowLeftIcon.displayName = 'ArrowLeftIcon';

const DepositIcon = memo(() => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m0 0l-4-4m4 4l4-4" />
  </svg>
));
DepositIcon.displayName = 'DepositIcon';

const SearchIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
));
SearchIcon.displayName = 'SearchIcon';

const CopyIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
));
CopyIcon.displayName = 'CopyIcon';

const CheckCircleIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
));
CheckCircleIcon.displayName = 'CheckCircleIcon';

const InfoIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
));
InfoIcon.displayName = 'InfoIcon';

const QRIcon = memo(() => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
  </svg>
));
QRIcon.displayName = 'QRIcon';

const ClockIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
));
ClockIcon.displayName = 'ClockIcon';

const RefreshIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
));
RefreshIcon.displayName = 'RefreshIcon';

const XIcon = memo(() => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
));
XIcon.displayName = 'XIcon';

interface Network {
  id: string;
  name: string;
  fullName: string;
  confirmations: number;
  estimatedTime: string;
  fee: string;
  minDeposit: string;
  available: boolean;
}

interface Crypto {
  id: string;
  symbol: string;
  name: string;
  icon: string;
  networks: Network[];
  description: string;
}

interface Transaction {
  id: string;
  type: 'deposit';
  crypto: string;
  amount: string;
  status: 'pending' | 'completed' | 'confirming';
  confirmations: string;
  time: string;
  txHash: string;
}

const CRYPTO_LIST: Crypto[] = [
  {
    id: '1',
    symbol: 'BTC',
    name: 'Bitcoin',
    icon: '₿',
    description: 'The original cryptocurrency',
    networks: [
      { id: 'btc-1', name: 'Bitcoin', fullName: 'Bitcoin Network', confirmations: 2, estimatedTime: '20-30 min', fee: 'Dynamic', minDeposit: '0.0001 BTC', available: true },
      { id: 'btc-2', name: 'Lightning', fullName: 'Lightning Network', confirmations: 1, estimatedTime: '1-2 min', fee: 'Very Low', minDeposit: '0.00001 BTC', available: true },
    ]
  },
  {
    id: '2',
    symbol: 'ETH',
    name: 'Ethereum',
    icon: 'Ξ',
    description: 'Smart contract platform',
    networks: [
      { id: 'eth-1', name: 'ERC20', fullName: 'Ethereum (ERC20)', confirmations: 12, estimatedTime: '5-10 min', fee: 'Dynamic', minDeposit: '0.001 ETH', available: true },
      { id: 'eth-2', name: 'Arbitrum', fullName: 'Arbitrum One', confirmations: 1, estimatedTime: '2-5 min', fee: 'Low', minDeposit: '0.0001 ETH', available: true },
    ]
  },
  {
    id: '3',
    symbol: 'BNB',
    name: 'Binance Coin',
    icon: '◈',
    description: 'Binance Smart Chain native token',
    networks: [
      { id: 'bnb-1', name: 'BEP20', fullName: 'BNB Smart Chain (BEP20)', confirmations: 15, estimatedTime: '3-5 min', fee: 'Low', minDeposit: '0.01 BNB', available: true },
      { id: 'bnb-2', name: 'BEP2', fullName: 'Binance Chain (BEP2)', confirmations: 1, estimatedTime: '1-2 min', fee: 'Very Low', minDeposit: '0.01 BNB', available: true },
    ]
  },
  {
    id: '4',
    symbol: 'USDT',
    name: 'Tether',
    icon: '₮',
    description: 'USD-pegged stablecoin',
    networks: [
      { id: 'usdt-1', name: 'ERC20', fullName: 'Ethereum (ERC20)', confirmations: 12, estimatedTime: '5-10 min', fee: 'High', minDeposit: '10 USDT', available: true },
      { id: 'usdt-2', name: 'TRC20', fullName: 'TRON (TRC20)', confirmations: 19, estimatedTime: '2-5 min', fee: 'Very Low', minDeposit: '1 USDT', available: true },
      { id: 'usdt-3', name: 'BEP20', fullName: 'BNB Smart Chain (BEP20)', confirmations: 15, estimatedTime: '3-5 min', fee: 'Low', minDeposit: '1 USDT', available: true },
    ]
  },
  {
    id: '5',
    symbol: 'USDC',
    name: 'USD Coin',
    icon: '$',
    description: 'Regulated USD stablecoin',
    networks: [
      { id: 'usdc-1', name: 'ERC20', fullName: 'Ethereum (ERC20)', confirmations: 12, estimatedTime: '5-10 min', fee: 'High', minDeposit: '10 USDC', available: true },
      { id: 'usdc-2', name: 'Polygon', fullName: 'Polygon Network', confirmations: 128, estimatedTime: '5-10 min', fee: 'Very Low', minDeposit: '1 USDC', available: true },
    ]
  },
  {
    id: '6',
    symbol: 'SOL',
    name: 'Solana',
    icon: '◎',
    description: 'High-performance blockchain',
    networks: [
      { id: 'sol-1', name: 'Solana', fullName: 'Solana Network', confirmations: 1, estimatedTime: '1-2 min', fee: 'Very Low', minDeposit: '0.01 SOL', available: true },
    ]
  },
  {
    id: '7',
    symbol: 'XRP',
    name: 'Ripple',
    icon: '✕',
    description: 'Fast payment network',
    networks: [
      { id: 'xrp-1', name: 'Ripple', fullName: 'Ripple Network', confirmations: 1, estimatedTime: '1-2 min', fee: 'Very Low', minDeposit: '10 XRP', available: true },
    ]
  },
  {
    id: '8',
    symbol: 'ADA',
    name: 'Cardano',
    icon: '₳',
    description: 'Proof of stake blockchain',
    networks: [
      { id: 'ada-1', name: 'Cardano', fullName: 'Cardano Network', confirmations: 15, estimatedTime: '5-10 min', fee: 'Low', minDeposit: '5 ADA', available: true },
    ]
  },
  {
    id: '9',
    symbol: 'DOT',
    name: 'Polkadot',
    icon: '●',
    description: 'Multi-chain network',
    networks: [
      { id: 'dot-1', name: 'Polkadot', fullName: 'Polkadot Network', confirmations: 10, estimatedTime: '10-15 min', fee: 'Low', minDeposit: '1 DOT', available: true },
    ]
  },
  {
    id: '10',
    symbol: 'DOGE',
    name: 'Dogecoin',
    icon: 'Ð',
    description: 'The meme cryptocurrency',
    networks: [
      { id: 'doge-1', name: 'Dogecoin', fullName: 'Dogecoin Network', confirmations: 6, estimatedTime: '10-15 min', fee: 'Very Low', minDeposit: '50 DOGE', available: true },
    ]
  },
];

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: '1', type: 'deposit', crypto: 'BTC', amount: '0.0234', status: 'completed', confirmations: '2/2', time: '2 hours ago', txHash: 'bc1q...a4f2' },
  { id: '2', type: 'deposit', crypto: 'ETH', amount: '1.5', status: 'confirming', confirmations: '8/12', time: '15 minutes ago', txHash: '0x3a...9f12' },
  { id: '3', type: 'deposit', crypto: 'USDT', amount: '1000', status: 'completed', confirmations: '19/19', time: '1 day ago', txHash: 'TYx...7k9p' },
];

const DepositPage = () => {
  const [selectedCrypto, setSelectedCrypto] = useState<Crypto>(CRYPTO_LIST[0]);
  const [selectedNetwork, setSelectedNetwork] = useState<Network>(CRYPTO_LIST[0].networks[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [addressGenerated, setAddressGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Generate mock deposit address
  const depositAddress = useMemo(() => {
    if (!addressGenerated) return '';
    const prefix = selectedNetwork.name === 'ERC20' || selectedNetwork.name === 'Arbitrum' ? '0x' : 
                   selectedNetwork.name === 'TRC20' ? 'T' :
                   selectedNetwork.name.includes('BEP') ? '0x' :
                   selectedCrypto.symbol;
    return `${prefix}${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
  }, [selectedCrypto, selectedNetwork, addressGenerated]);

  const filteredCryptos = useMemo(() => {
    return CRYPTO_LIST.filter(
      crypto =>
        crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleCopyAddress = useCallback(() => {
    if (!depositAddress) return;
    navigator.clipboard.writeText(depositAddress);
    setCopied(true);
    showNotification('Address copied to clipboard', 'success');
    setTimeout(() => setCopied(false), 2000);
  }, [depositAddress]);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleCryptoSelect = useCallback((crypto: Crypto) => {
    setSelectedCrypto(crypto);
    setSelectedNetwork(crypto.networks[0]);
    setAddressGenerated(false);
    setCopied(false);
    setShowQR(false);
  }, []);

  const handleNetworkSelect = useCallback((network: Network) => {
    setSelectedNetwork(network);
    setShowNetworkModal(false);
    setAddressGenerated(false);
    setCopied(false);
    setShowQR(false);
  }, []);

  const generateAddress = useCallback(() => {
    setIsGenerating(true);
    setTimeout(() => {
      setAddressGenerated(true);
      setIsGenerating(false);
      showNotification('Deposit address generated successfully', 'success');
    }, 800);
  }, []);

  const showNotification = useCallback((message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  const refreshTransactions = useCallback(() => {
    showNotification('Transactions refreshed', 'success');
    // In real app, fetch from API
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-xl shadow-2xl border-2 animate-fade-in ${
          notification.type === 'success' 
            ? 'bg-green-50 border-green-500 text-green-800' 
            : 'bg-red-50 border-red-500 text-red-800'
        }`}>
          <div className="flex items-center gap-3">
            {notification.type === 'success' ? <CheckCircleIcon /> : <InfoIcon />}
            <span className="font-semibold">{notification.message}</span>
          </div>
        </div>
      )}

      {/* Network Selection Modal */}
      {showNetworkModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden animate-scale-in">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-black">Select Network</h3>
              <button
                onClick={() => setShowNetworkModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XIcon />
              </button>
            </div>
            <div className="p-6 space-y-3 overflow-y-auto max-h-[60vh]">
              {selectedCrypto.networks.map((network) => (
                <button
                  key={network.id}
                  onClick={() => handleNetworkSelect(network)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    selectedNetwork.id === network.id
                      ? 'border-black bg-gray-50'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-bold text-lg text-black">{network.name}</div>
                      <div className="text-sm text-gray-600">{network.fullName}</div>
                    </div>
                    {network.available ? (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                        Active
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">
                        Unavailable
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Min Deposit:</span>
                      <div className="font-semibold text-black">{network.minDeposit}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Confirmations:</span>
                      <div className="font-semibold text-black">{network.confirmations}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Est. Time:</span>
                      <div className="font-semibold text-black">{network.estimatedTime}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-black via-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full filter blur-3xl animate-blob" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-white rounded-full filter blur-3xl animate-blob animation-delay-2000" />
        </div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <Link
              href="/assets"
              className="inline-flex items-center gap-2 text-white hover:text-gray-300 transition-colors mb-6"
            >
              <ArrowLeftIcon />
              <span className="font-medium">Back to Assets</span>
            </Link>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center">
                <DepositIcon />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Deposit Crypto</h1>
                <p className="text-gray-400">Fund your account with cryptocurrency</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Panel - Crypto Selection */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-black mb-4">Select Cryptocurrency</h2>
                
                <div className="relative mb-4">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <SearchIcon />
                  </div>
                  <input
                    type="text"
                    placeholder="Search crypto..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {filteredCryptos.map((crypto) => (
                    <button
                      key={crypto.id}
                      onClick={() => handleCryptoSelect(crypto)}
                      className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${
                        selectedCrypto.id === crypto.id
                          ? 'bg-black text-white'
                          : 'bg-gray-50 hover:bg-gray-100 text-black'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold ${
                        selectedCrypto.id === crypto.id ? 'bg-white text-black' : 'bg-black text-white'
                      }`}>
                        {crypto.icon}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-bold">{crypto.symbol}</div>
                        <div className={`text-sm ${selectedCrypto.id === crypto.id ? 'text-gray-300' : 'text-gray-500'}`}>
                          {crypto.name}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Deposits */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-black">Recent Deposits</h2>
                  <button
                    onClick={refreshTransactions}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <RefreshIcon />
                  </button>
                </div>
                <div className="space-y-3">
                  {transactions.slice(0, 3).map((tx) => (
                    <div key={tx.id} className="p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-bold text-black">{tx.amount} {tx.crypto}</div>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          tx.status === 'completed' ? 'bg-green-100 text-green-700' :
                          tx.status === 'confirming' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {tx.status}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {tx.confirmations} • {tx.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Panel - Deposit Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-black mb-2">
                    Deposit {selectedCrypto.symbol}
                  </h2>
                  <p className="text-gray-600">{selectedCrypto.description}</p>
                </div>

                {/* Important Notice */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                  <div className="flex gap-3">
                    <div className="text-yellow-600 flex-shrink-0">
                      <InfoIcon />
                    </div>
                    <div className="text-sm text-yellow-800">
                      <p className="font-bold mb-1">Important Notice</p>
                      <ul className="space-y-1 list-disc list-inside">
                        <li>Only send {selectedCrypto.symbol} to this address via {selectedNetwork.name}</li>
                        <li>Minimum deposit: {selectedNetwork.minDeposit}</li>
                        <li>Required confirmations: {selectedNetwork.confirmations}</li>
                        <li>Deposits below minimum will not be credited</li>
                        <li>Contract deposit is not supported</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Network Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Select Network
                  </label>
                  <button
                    onClick={() => setShowNetworkModal(true)}
                    className="w-full bg-gray-50 border-2 border-gray-200 hover:border-black rounded-xl p-4 transition-all text-left"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-black text-lg">{selectedNetwork.name}</div>
                        <div className="text-sm text-gray-500">{selectedNetwork.fullName}</div>
                        <div className="text-xs text-gray-400 mt-1">
                          Est. arrival: {selectedNetwork.estimatedTime} • Fee: {selectedNetwork.fee}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                        <CheckCircleIcon />
                        Active
                      </div>
                    </div>
                  </button>
                  {selectedCrypto.networks.length > 1 && (
                    <p className="text-xs text-gray-500 mt-2">
                      {selectedCrypto.networks.length} networks available. Click to change.
                    </p>
                  )}
                </div>

                {/* Generate Address Button */}
                {!addressGenerated && (
                  <button
                    onClick={generateAddress}
                    disabled={isGenerating}
                    className={`w-full mb-6 py-4 rounded-xl font-bold text-lg transition-all ${
                      isGenerating
                        ? 'bg-gray-200 text-gray-400 cursor-wait'
                        : 'bg-black text-white hover:bg-gray-800 hover:scale-105 active:scale-95'
                    }`}
                  >
                    {isGenerating ? 'Generating Address...' : 'Generate Deposit Address'}
                  </button>
                )}

                {/* Deposit Address */}
                {addressGenerated && (
                  <div className="mb-6 animate-fade-in">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        Deposit Address
                      </label>
                      <button
                        onClick={() => setShowQR(!showQR)}
                        className="flex items-center gap-1 text-sm text-black hover:text-gray-700 font-medium"
                      >
                        <QRIcon />
                        {showQR ? 'Hide' : 'Show'} QR Code
                      </button>
                    </div>
                    
                    <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4">
                      <div className="font-mono text-sm text-black break-all mb-3 select-all">
                        {depositAddress}
                      </div>
                      <button
                        onClick={handleCopyAddress}
                        className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold transition-all ${
                          copied
                            ? 'bg-green-500 text-white'
                            : 'bg-black text-white hover:bg-gray-800'
                        }`}
                      >
                        {copied ? (
                          <>
                            <CheckCircleIcon />
                            Copied!
                          </>
                        ) : (
                          <>
                            <CopyIcon />
                            Copy Address
                          </>
                        )}
                      </button>
                    </div>

                    {/* QR Code Display */}
                    {showQR && (
                      <div className="mt-4 flex justify-center animate-fade-in">
                        <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-lg">
                          <div className="w-48 h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mb-3 relative overflow-hidden">
                            {/* Simple QR Pattern Visualization */}
                            <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-1 p-2">
                              {Array.from({ length: 64 }).map((_, i) => (
                                <div
                                  key={i}
                                  className={`rounded-sm ${
                                    Math.random() > 0.5 ? 'bg-black' : 'bg-white'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-xs text-center text-gray-600 font-semibold">
                            Scan to get deposit address
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Deposit Info Grid */}
                {addressGenerated && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 animate-fade-in">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                      <div className="text-sm text-gray-600 mb-1">Minimum Deposit</div>
                      <div className="font-bold text-black">{selectedNetwork.minDeposit}</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                      <div className="text-sm text-gray-600 mb-1">Confirmations</div>
                      <div className="font-bold text-black">{selectedNetwork.confirmations} blocks</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                        <ClockIcon />
                        Est. Time
                      </div>
                      <div className="font-bold text-black">{selectedNetwork.estimatedTime}</div>
                    </div>
                  </div>
                )}

                {/* Steps Guide */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h3 className="font-bold text-black mb-4">How to Deposit</h3>
                  <ol className="space-y-3">
                    <li className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">
                        1
                      </div>
                      <div className="text-sm text-gray-700">
                        Select {selectedCrypto.symbol} and choose the correct network ({selectedNetwork.name})
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">
                        2
                      </div>
                      <div className="text-sm text-gray-700">
                        Copy the deposit address or scan the QR code
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">
                        3
                      </div>
                      <div className="text-sm text-gray-700">
                        Send {selectedCrypto.symbol} from your wallet (minimum: {selectedNetwork.minDeposit})
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">
                        4
                      </div>
                      <div className="text-sm text-gray-700">
                        Wait for {selectedNetwork.confirmations} network confirmations ({selectedNetwork.estimatedTime})
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">
                        5
                      </div>
                      <div className="text-sm text-gray-700">
                        Your balance will be credited automatically after confirmation
                      </div>
                    </li>
                  </ol>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-6">
                  <Link
                    href="/assets/history"
                    className="flex-1 px-6 py-3 bg-gray-100 text-black rounded-xl font-bold hover:bg-gray-200 transition-all text-center"
                  >
                    View History
                  </Link>
                  <Link
                    href="/help-center"
                    className="flex-1 px-6 py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-all text-center"
                  >
                    Need Help?
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(DepositPage);
