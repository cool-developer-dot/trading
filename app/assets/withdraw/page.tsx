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

const WithdrawIcon = memo(() => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20V4m0 0l4 4m-4-4l-4 4" />
  </svg>
));
WithdrawIcon.displayName = 'WithdrawIcon';

const SearchIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
));
SearchIcon.displayName = 'SearchIcon';

const InfoIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
));
InfoIcon.displayName = 'InfoIcon';

const WalletIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
));
WalletIcon.displayName = 'WalletIcon';

const ShieldIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
));
ShieldIcon.displayName = 'ShieldIcon';

const ClockIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
));
ClockIcon.displayName = 'ClockIcon';

const AlertIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
));
AlertIcon.displayName = 'AlertIcon';

const XIcon = memo(() => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
));
XIcon.displayName = 'XIcon';

const CheckCircleIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
));
CheckCircleIcon.displayName = 'CheckCircleIcon';

const BookmarkIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
  </svg>
));
BookmarkIcon.displayName = 'BookmarkIcon';

const RefreshIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
));
RefreshIcon.displayName = 'RefreshIcon';

interface Network {
  id: string;
  name: string;
  fullName: string;
  fee: string;
  minWithdraw: number;
  maxWithdraw: number;
  processingTime: string;
  enabled: boolean;
}

interface Crypto {
  id: string;
  symbol: string;
  name: string;
  icon: string;
  balance: number;
  available: number;
  locked: number;
  networks: Network[];
  usdValue: number;
}

interface SavedAddress {
  id: string;
  label: string;
  address: string;
  network: string;
  crypto: string;
}

interface Transaction {
  id: string;
  type: 'withdraw';
  crypto: string;
  amount: string;
  status: 'pending' | 'completed' | 'processing' | 'failed';
  address: string;
  time: string;
  txHash: string;
}

const CRYPTO_LIST: Crypto[] = [
  {
    id: '1',
    symbol: 'BTC',
    name: 'Bitcoin',
    icon: '₿',
    balance: 0.45823,
    available: 0.45823,
    locked: 0,
    usdValue: 19234.56,
    networks: [
      { id: 'btc-1', name: 'Bitcoin', fullName: 'Bitcoin Network', fee: '0.0005 BTC', minWithdraw: 0.001, maxWithdraw: 100, processingTime: '30-60 min', enabled: true },
      { id: 'btc-2', name: 'Lightning', fullName: 'Lightning Network', fee: '0.00001 BTC', minWithdraw: 0.0001, maxWithdraw: 1, processingTime: '1-2 min', enabled: true },
    ]
  },
  {
    id: '2',
    symbol: 'ETH',
    name: 'Ethereum',
    icon: 'Ξ',
    balance: 5.234,
    available: 5.234,
    locked: 0,
    usdValue: 9876.54,
    networks: [
      { id: 'eth-1', name: 'ERC20', fullName: 'Ethereum (ERC20)', fee: '0.005 ETH', minWithdraw: 0.01, maxWithdraw: 500, processingTime: '10-20 min', enabled: true },
      { id: 'eth-2', name: 'Arbitrum', fullName: 'Arbitrum One', fee: '0.0001 ETH', minWithdraw: 0.001, maxWithdraw: 100, processingTime: '2-5 min', enabled: true },
    ]
  },
  {
    id: '3',
    symbol: 'BNB',
    name: 'Binance Coin',
    icon: '◈',
    balance: 12.45,
    available: 12.45,
    locked: 0,
    usdValue: 3456.78,
    networks: [
      { id: 'bnb-1', name: 'BEP20', fullName: 'BNB Smart Chain (BEP20)', fee: '0.001 BNB', minWithdraw: 0.1, maxWithdraw: 1000, processingTime: '5-10 min', enabled: true },
    ]
  },
  {
    id: '4',
    symbol: 'USDT',
    name: 'Tether',
    icon: '₮',
    balance: 5000,
    available: 5000,
    locked: 0,
    usdValue: 5000,
    networks: [
      { id: 'usdt-1', name: 'ERC20', fullName: 'Ethereum (ERC20)', fee: '10 USDT', minWithdraw: 20, maxWithdraw: 100000, processingTime: '10-20 min', enabled: true },
      { id: 'usdt-2', name: 'TRC20', fullName: 'TRON (TRC20)', fee: '1 USDT', minWithdraw: 10, maxWithdraw: 100000, processingTime: '2-5 min', enabled: true },
      { id: 'usdt-3', name: 'BEP20', fullName: 'BNB Smart Chain (BEP20)', fee: '1 USDT', minWithdraw: 10, maxWithdraw: 100000, processingTime: '3-5 min', enabled: true },
    ]
  },
  {
    id: '5',
    symbol: 'USDC',
    name: 'USD Coin',
    icon: '$',
    balance: 3000,
    available: 3000,
    locked: 0,
    usdValue: 3000,
    networks: [
      { id: 'usdc-1', name: 'ERC20', fullName: 'Ethereum (ERC20)', fee: '10 USDC', minWithdraw: 20, maxWithdraw: 100000, processingTime: '10-20 min', enabled: true },
    ]
  },
  {
    id: '6',
    symbol: 'SOL',
    name: 'Solana',
    icon: '◎',
    balance: 23.45,
    available: 23.45,
    locked: 0,
    usdValue: 2345.67,
    networks: [
      { id: 'sol-1', name: 'Solana', fullName: 'Solana Network', fee: '0.01 SOL', minWithdraw: 0.1, maxWithdraw: 1000, processingTime: '5-10 min', enabled: true },
    ]
  },
  {
    id: '7',
    symbol: 'XRP',
    name: 'Ripple',
    icon: '✕',
    balance: 2345.67,
    available: 2345.67,
    locked: 0,
    usdValue: 1234.56,
    networks: [
      { id: 'xrp-1', name: 'Ripple', fullName: 'Ripple Network', fee: '0.25 XRP', minWithdraw: 20, maxWithdraw: 100000, processingTime: '2-5 min', enabled: true },
    ]
  },
  {
    id: '8',
    symbol: 'ADA',
    name: 'Cardano',
    icon: '₳',
    balance: 1234.56,
    available: 1234.56,
    locked: 0,
    usdValue: 456.78,
    networks: [
      { id: 'ada-1', name: 'Cardano', fullName: 'Cardano Network', fee: '1 ADA', minWithdraw: 10, maxWithdraw: 50000, processingTime: '10-15 min', enabled: true },
    ]
  },
  {
    id: '9',
    symbol: 'DOT',
    name: 'Polkadot',
    icon: '●',
    balance: 234.56,
    available: 234.56,
    locked: 0,
    usdValue: 1456.78,
    networks: [
      { id: 'dot-1', name: 'Polkadot', fullName: 'Polkadot Network', fee: '0.1 DOT', minWithdraw: 1, maxWithdraw: 10000, processingTime: '15-20 min', enabled: true },
    ]
  },
  {
    id: '10',
    symbol: 'DOGE',
    name: 'Dogecoin',
    icon: 'Ð',
    balance: 12345.67,
    available: 12345.67,
    locked: 0,
    usdValue: 987.65,
    networks: [
      { id: 'doge-1', name: 'Dogecoin', fullName: 'Dogecoin Network', fee: '5 DOGE', minWithdraw: 100, maxWithdraw: 100000, processingTime: '10-15 min', enabled: true },
    ]
  },
];

const SAVED_ADDRESSES: SavedAddress[] = [
  { id: '1', label: 'My Ledger Wallet', address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb', network: 'ERC20', crypto: 'ETH' },
  { id: '2', label: 'Binance Cold Storage', address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', network: 'Bitcoin', crypto: 'BTC' },
  { id: '3', label: 'Hardware Wallet', address: 'TYx3wLhR9sUNxxx1234567890abcdefghij', network: 'TRC20', crypto: 'USDT' },
];

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: '1', type: 'withdraw', crypto: 'BTC', amount: '0.05', status: 'completed', address: 'bc1q...h0wl', time: '2 hours ago', txHash: 'abc123...def456' },
  { id: '2', type: 'withdraw', crypto: 'ETH', amount: '2.5', status: 'processing', address: '0x742...0bEb', time: '30 minutes ago', txHash: 'pending' },
  { id: '3', type: 'withdraw', crypto: 'USDT', amount: '500', status: 'completed', address: 'TYx...ghij', time: '1 day ago', txHash: 'xyz789...uvw012' },
];

const WithdrawPage = () => {
  const [selectedCrypto, setSelectedCrypto] = useState<Crypto>(CRYPTO_LIST[0]);
  const [selectedNetwork, setSelectedNetwork] = useState<Network>(CRYPTO_LIST[0].networks[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [withdrawAddress, setWithdrawAddress] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const [showAddressBook, setShowAddressBook] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [twoFACode, setTwoFACode] = useState('');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [addressError, setAddressError] = useState('');
  const [amountError, setAmountError] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [saveAddress, setSaveAddress] = useState(false);
  const [addressLabel, setAddressLabel] = useState('');

  const filteredCryptos = useMemo(() => {
    return CRYPTO_LIST.filter(
      crypto =>
        crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleCryptoSelect = useCallback((crypto: Crypto) => {
    setSelectedCrypto(crypto);
    setSelectedNetwork(crypto.networks[0]);
    setWithdrawAmount('');
    setWithdrawAddress('');
    setAddressError('');
    setAmountError('');
  }, []);

  const handleNetworkSelect = useCallback((network: Network) => {
    setSelectedNetwork(network);
    setShowNetworkModal(false);
    setWithdrawAddress('');
    setAddressError('');
  }, []);

  const handleMaxClick = useCallback(() => {
    const fee = parseFloat(selectedNetwork.fee.split(' ')[0]);
    const maxAmount = Math.max(0, selectedCrypto.available - fee);
    setWithdrawAmount(maxAmount.toFixed(8));
    setAmountError('');
  }, [selectedCrypto, selectedNetwork]);

  const handleAddressSelect = useCallback((address: SavedAddress) => {
    if (address.crypto === selectedCrypto.symbol && address.network === selectedNetwork.name) {
      setWithdrawAddress(address.address);
      setShowAddressBook(false);
      setAddressError('');
      showNotification(`Address loaded: ${address.label}`, 'success');
    } else {
      showNotification(`This address is for ${address.crypto} on ${address.network}`, 'error');
    }
  }, [selectedCrypto, selectedNetwork]);

  const validateAddress = useCallback((address: string) => {
    if (address.length === 0) {
      setAddressError('');
      return false;
    }
    
    if (address.length < 26) {
      setAddressError('Address is too short');
      return false;
    }
    
    // Basic format validation
    const formats: { [key: string]: RegExp } = {
      'Bitcoin': /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,62}$/,
      'ERC20': /^0x[a-fA-F0-9]{40}$/,
      'TRC20': /^T[a-zA-Z0-9]{33}$/,
      'BEP20': /^0x[a-fA-F0-9]{40}$/,
      'Arbitrum': /^0x[a-fA-F0-9]{40}$/,
    };
    
    const format = formats[selectedNetwork.name];
    if (format && !format.test(address)) {
      setAddressError(`Invalid ${selectedNetwork.name} address format`);
      return false;
    }
    
    setAddressError('');
    return true;
  }, [selectedNetwork]);

  const validateAmount = useCallback((amount: string) => {
    const numAmount = parseFloat(amount);
    
    if (!amount || isNaN(numAmount)) {
      setAmountError('');
      return false;
    }
    
    if (numAmount < selectedNetwork.minWithdraw) {
      setAmountError(`Minimum withdrawal: ${selectedNetwork.minWithdraw} ${selectedCrypto.symbol}`);
      return false;
    }
    
    if (numAmount > selectedNetwork.maxWithdraw) {
      setAmountError(`Maximum withdrawal: ${selectedNetwork.maxWithdraw} ${selectedCrypto.symbol}`);
      return false;
    }
    
    if (numAmount > selectedCrypto.available) {
      setAmountError('Insufficient balance');
      return false;
    }
    
    setAmountError('');
    return true;
  }, [selectedNetwork, selectedCrypto]);

  useEffect(() => {
    validateAddress(withdrawAddress);
  }, [withdrawAddress, validateAddress]);

  useEffect(() => {
    validateAmount(withdrawAmount);
  }, [withdrawAmount, validateAmount]);

  const amountToReceive = useMemo(() => {
    const amount = parseFloat(withdrawAmount) || 0;
    const fee = parseFloat(selectedNetwork.fee.split(' ')[0]);
    return Math.max(0, amount - fee);
  }, [withdrawAmount, selectedNetwork]);

  const isValidWithdraw = useMemo(() => {
    return (
      withdrawAddress.length > 25 &&
      !addressError &&
      parseFloat(withdrawAmount) >= selectedNetwork.minWithdraw &&
      parseFloat(withdrawAmount) <= selectedCrypto.available &&
      !amountError &&
      agreedToTerms
    );
  }, [withdrawAddress, addressError, withdrawAmount, amountError, selectedNetwork, selectedCrypto, agreedToTerms]);

  const showNotification = useCallback((message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  const handleWithdrawClick = useCallback(() => {
    if (isValidWithdraw) {
      setShowConfirmModal(true);
    }
  }, [isValidWithdraw]);

  const confirmWithdraw = useCallback(() => {
    setShowConfirmModal(false);
    setShow2FAModal(true);
  }, []);

  const handleWithdraw = useCallback(() => {
    if (twoFACode.length === 6) {
      setShow2FAModal(false);
      
      // Simulate withdrawal
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        type: 'withdraw',
        crypto: selectedCrypto.symbol,
        amount: withdrawAmount,
        status: 'processing',
        address: withdrawAddress.substring(0, 8) + '...' + withdrawAddress.substring(withdrawAddress.length - 4),
        time: 'Just now',
        txHash: 'pending'
      };
      
      setTransactions(prev => [newTransaction, ...prev]);
      
      showNotification('Withdrawal request submitted successfully!', 'success');
      
      // Reset form
      setWithdrawAddress('');
      setWithdrawAmount('');
      setMemo('');
      setAgreedToTerms(false);
      setTwoFACode('');
      setSaveAddress(false);
      setAddressLabel('');
      
      // Simulate status update
      setTimeout(() => {
        setTransactions(prev => 
          prev.map(tx => 
            tx.id === newTransaction.id 
              ? { ...tx, status: 'completed', txHash: 'abc' + Math.random().toString(36).substring(2, 15) }
              : tx
          )
        );
      }, 3000);
    } else {
      showNotification('Invalid 2FA code', 'error');
    }
  }, [twoFACode, withdrawAmount, withdrawAddress, selectedCrypto, showNotification]);

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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowNetworkModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden animate-scale-in" onClick={(e) => e.stopPropagation()}>
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
                  disabled={!network.enabled}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    selectedNetwork.id === network.id
                      ? 'border-black bg-gray-50'
                      : network.enabled 
                        ? 'border-gray-200 hover:border-gray-400'
                        : 'border-gray-100 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-bold text-lg text-black">{network.name}</div>
                      <div className="text-sm text-gray-600">{network.fullName}</div>
                    </div>
                    {network.enabled ? (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                        Active
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">
                        Disabled
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Fee:</span>
                      <div className="font-semibold text-black">{network.fee}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Min:</span>
                      <div className="font-semibold text-black">{network.minWithdraw}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Time:</span>
                      <div className="font-semibold text-black">{network.processingTime}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Address Book Modal */}
      {showAddressBook && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowAddressBook(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-black">Saved Addresses</h3>
              <button
                onClick={() => setShowAddressBook(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XIcon />
              </button>
            </div>
            <div className="p-6 space-y-3 overflow-y-auto max-h-[60vh]">
              {SAVED_ADDRESSES.length > 0 ? (
                SAVED_ADDRESSES.map((address) => (
                  <button
                    key={address.id}
                    onClick={() => handleAddressSelect(address)}
                    className="w-full p-4 rounded-xl border-2 border-gray-200 hover:border-black transition-all text-left"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-bold text-black">{address.label}</div>
                        <div className="text-sm text-gray-600 font-mono">{address.address.substring(0, 20)}...{address.address.substring(address.address.length - 8)}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-black">{address.crypto}</div>
                        <div className="text-xs text-gray-500">{address.network}</div>
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No saved addresses</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowConfirmModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-black">Confirm Withdrawal</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-sm text-gray-600 mb-1">You're withdrawing</div>
                <div className="text-2xl font-bold text-black">{withdrawAmount} {selectedCrypto.symbol}</div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Network</span>
                  <span className="font-semibold text-black">{selectedNetwork.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Address</span>
                  <span className="font-mono text-black">{withdrawAddress.substring(0, 12)}...{withdrawAddress.substring(withdrawAddress.length - 8)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Network Fee</span>
                  <span className="font-semibold text-black">{selectedNetwork.fee}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="font-bold text-black">You'll Receive</span>
                    <span className="font-bold text-xl text-black">{amountToReceive.toFixed(8)} {selectedCrypto.symbol}</span>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 flex gap-2">
                <AlertIcon />
                <p className="text-sm text-yellow-800">
                  Please verify all details. Withdrawals cannot be reversed.
                </p>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 px-6 py-3 bg-gray-100 text-black rounded-xl font-bold hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmWithdraw}
                className="flex-1 px-6 py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-all"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2FA Modal */}
      {show2FAModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4 animate-fade-in" onClick={() => setShow2FAModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-black">2FA Verification</h3>
              <p className="text-gray-600 mt-1">Enter your 2FA code to complete withdrawal</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-center gap-2 mb-6">
                <ShieldIcon />
                <span className="text-sm text-gray-600">Security verification required</span>
              </div>
              <input
                type="text"
                placeholder="Enter 6-digit code"
                value={twoFACode}
                onChange={(e) => setTwoFACode(e.target.value.replace(/\D/g, '').substring(0, 6))}
                className="w-full px-4 py-4 text-center text-2xl font-bold tracking-widest bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                maxLength={6}
                autoFocus
              />
              <p className="text-xs text-center text-gray-500">
                Enter the 6-digit code from your authenticator app
              </p>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setShow2FAModal(false)}
                className="flex-1 px-6 py-3 bg-gray-100 text-black rounded-xl font-bold hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleWithdraw}
                disabled={twoFACode.length !== 6}
                className={`flex-1 px-6 py-3 rounded-xl font-bold transition-all ${
                  twoFACode.length === 6
                    ? 'bg-black text-white hover:bg-gray-800'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Submit
              </button>
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
                <WithdrawIcon />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Withdraw Crypto</h1>
                <p className="text-gray-400">Send cryptocurrency to external wallet</p>
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
                          Available: {crypto.available.toFixed(4)}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Withdrawals */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-black">Recent Withdrawals</h2>
                  <button
                    onClick={() => showNotification('Transactions refreshed', 'success')}
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
                          tx.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                          tx.status === 'failed' ? 'bg-red-100 text-red-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {tx.status}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        To: {tx.address} • {tx.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Panel - Withdrawal Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-black mb-2">
                    Withdraw {selectedCrypto.symbol}
                  </h2>
                  <p className="text-gray-600">
                    Send {selectedCrypto.name} to external wallet
                  </p>
                </div>

                {/* Security Warning */}
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                  <div className="flex gap-3">
                    <div className="text-red-600 flex-shrink-0">
                      <AlertIcon />
                    </div>
                    <div className="text-sm text-red-800">
                      <p className="font-bold mb-1">Security Warning</p>
                      <ul className="space-y-1 list-disc list-inside">
                        <li>Double-check the withdrawal address and network</li>
                        <li>Withdrawals cannot be reversed or cancelled</li>
                        <li>Only send to {selectedCrypto.symbol} addresses on {selectedNetwork.name}</li>
                        <li>2FA verification is required for all withdrawals</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Balance Display */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Available Balance</div>
                      <div className="font-bold text-2xl text-black">
                        {selectedCrypto.available.toFixed(8)} {selectedCrypto.symbol}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        ≈ ${selectedCrypto.usdValue.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD
                      </div>
                    </div>
                    <WalletIcon />
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
                          Fee: {selectedNetwork.fee} • Time: {selectedNetwork.processingTime}
                        </div>
                      </div>
                      <ShieldIcon />
                    </div>
                  </button>
                  {selectedCrypto.networks.length > 1 && (
                    <p className="text-xs text-gray-500 mt-2">
                      {selectedCrypto.networks.length} networks available. Click to change.
                    </p>
                  )}
                </div>

                {/* Withdrawal Address */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Withdrawal Address *
                    </label>
                    <button
                      onClick={() => setShowAddressBook(true)}
                      className="flex items-center gap-1 text-sm text-black hover:text-gray-700 font-medium"
                    >
                      <BookmarkIcon />
                      Address Book
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder={`Enter ${selectedCrypto.symbol} address (${selectedNetwork.name})`}
                    value={withdrawAddress}
                    onChange={(e) => setWithdrawAddress(e.target.value)}
                    className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all font-mono text-sm ${
                      addressError ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-transparent'
                    }`}
                  />
                  {addressError && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <InfoIcon />
                      {addressError}
                    </p>
                  )}
                  {!addressError && withdrawAddress.length > 25 && (
                    <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                      <CheckCircleIcon />
                      Address format is valid
                    </p>
                  )}
                </div>

                {/* Memo/Tag (optional for some cryptos) */}
                {['XRP', 'XLM', 'EOS'].includes(selectedCrypto.symbol) && (
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Memo/Tag (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="Enter memo/tag if required by receiving exchange"
                      value={memo}
                      onChange={(e) => setMemo(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      <InfoIcon /> Check if receiving platform requires a memo/tag
                    </p>
                  </div>
                )}

                {/* Withdrawal Amount */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Withdrawal Amount *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="0.00"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className={`w-full px-4 py-3 pr-24 bg-gray-50 border-2 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all text-lg font-semibold ${
                        amountError ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-transparent'
                      }`}
                      step="any"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      <button
                        onClick={handleMaxClick}
                        className="px-3 py-1 bg-black text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors"
                      >
                        MAX
                      </button>
                      <span className="font-bold text-gray-700">{selectedCrypto.symbol}</span>
                    </div>
                  </div>
                  {amountError ? (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <InfoIcon />
                      {amountError}
                    </p>
                  ) : (
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Min: {selectedNetwork.minWithdraw} {selectedCrypto.symbol}</span>
                      <span>Max: {selectedNetwork.maxWithdraw} {selectedCrypto.symbol}</span>
                    </div>
                  )}
                </div>

                {/* Fee and Receipt Summary */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-6">
                  <h3 className="font-bold text-black mb-4">Withdrawal Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Withdrawal Amount</span>
                      <span className="font-semibold text-black">
                        {withdrawAmount || '0'} {selectedCrypto.symbol}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Network Fee</span>
                      <span className="font-semibold text-black">{selectedNetwork.fee}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 flex items-center gap-1">
                        <ClockIcon />
                        Processing Time
                      </span>
                      <span className="font-semibold text-black">{selectedNetwork.processingTime}</span>
                    </div>
                    <div className="border-t border-gray-300 pt-3 mt-3">
                      <div className="flex justify-between">
                        <span className="font-bold text-black">You'll Receive</span>
                        <span className="font-bold text-xl text-green-600">
                          {amountToReceive.toFixed(8)} {selectedCrypto.symbol}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Save Address Option */}
                {withdrawAddress.length > 25 && !addressError && (
                  <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl animate-fade-in">
                    <label className="flex items-start gap-3 cursor-pointer mb-3">
                      <input
                        type="checkbox"
                        checked={saveAddress}
                        onChange={(e) => setSaveAddress(e.target.checked)}
                        className="mt-1 w-5 h-5 rounded border-gray-300 text-black focus:ring-black"
                      />
                      <span className="text-sm text-gray-700 font-semibold">
                        Save this address to address book
                      </span>
                    </label>
                    {saveAddress && (
                      <input
                        type="text"
                        placeholder="Enter label (e.g., My Wallet)"
                        value={addressLabel}
                        onChange={(e) => setAddressLabel(e.target.value)}
                        className="w-full px-4 py-2 bg-white border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                      />
                    )}
                  </div>
                )}

                {/* Terms Agreement */}
                <div className="mb-6">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="mt-1 w-5 h-5 rounded border-gray-300 text-black focus:ring-black"
                    />
                    <span className="text-sm text-gray-700">
                      I have verified the withdrawal address and network. I understand that transactions cannot be reversed and agree to the{' '}
                      <Link href="/terms" className="text-black font-semibold hover:underline">
                        Terms of Service
                      </Link>
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleWithdrawClick}
                  disabled={!isValidWithdraw}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                    isValidWithdraw
                      ? 'bg-black text-white hover:bg-gray-800 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {!agreedToTerms ? 'Accept Terms to Continue' : 
                   !withdrawAddress ? 'Enter Withdrawal Address' :
                   !withdrawAmount ? 'Enter Amount' :
                   'Confirm Withdrawal'}
                </button>

                {/* Help Links */}
                <div className="flex gap-4 mt-6">
                  <Link
                    href="/assets/history"
                    className="flex-1 px-6 py-3 bg-gray-100 text-black rounded-xl font-bold hover:bg-gray-200 transition-all text-center"
                  >
                    View History
                  </Link>
                  <Link
                    href="/help-center"
                    className="flex-1 px-6 py-3 bg-gray-100 text-black rounded-xl font-bold hover:bg-gray-200 transition-all text-center"
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

export default memo(WithdrawPage);
