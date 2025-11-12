'use client';

import { memo, useCallback, useMemo, useState, useEffect } from 'react';
import Link from 'next/link';

// Icon Components
const ClockIcon = memo(() => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
));
ClockIcon.displayName = 'ClockIcon';

const DownloadIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
));
DownloadIcon.displayName = 'DownloadIcon';

const FilterIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
  </svg>
));
FilterIcon.displayName = 'FilterIcon';

const SearchIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
));
SearchIcon.displayName = 'SearchIcon';

const ArrowUpIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
  </svg>
));
ArrowUpIcon.displayName = 'ArrowUpIcon';

const ArrowDownIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
  </svg>
));
ArrowDownIcon.displayName = 'ArrowDownIcon';

const SwapIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>
));
SwapIcon.displayName = 'SwapIcon';

const CheckIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
));
CheckIcon.displayName = 'CheckIcon';

// Types
interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'trade' | 'staking';
  asset: string;
  amount: number;
  usdValue: number;
  status: 'completed' | 'pending' | 'failed';
  timestamp: Date;
  txHash?: string;
  fromAsset?: string;
  toAsset?: string;
}

// Mock Data
const MOCK_TRANSACTIONS: Transaction[] = [
  { id: '1', type: 'deposit', asset: 'BTC', amount: 0.5, usdValue: 21000, status: 'completed', timestamp: new Date('2024-01-15T10:30:00'), txHash: '0x1234...5678' },
  { id: '2', type: 'trade', fromAsset: 'BTC', toAsset: 'ETH', asset: 'BTC', amount: 0.1, usdValue: 4200, status: 'completed', timestamp: new Date('2024-01-15T09:15:00') },
  { id: '3', type: 'withdraw', asset: 'ETH', amount: 2.5, usdValue: 4750, status: 'pending', timestamp: new Date('2024-01-15T08:45:00'), txHash: '0xabcd...efgh' },
  { id: '4', type: 'staking', asset: 'ADA', amount: 500, usdValue: 185, status: 'completed', timestamp: new Date('2024-01-14T16:20:00') },
  { id: '5', type: 'deposit', asset: 'USDT', amount: 10000, usdValue: 10000, status: 'completed', timestamp: new Date('2024-01-14T14:30:00'), txHash: '0xijkl...mnop' },
  { id: '6', type: 'trade', fromAsset: 'USDT', toAsset: 'BNB', asset: 'USDT', amount: 3000, usdValue: 3000, status: 'completed', timestamp: new Date('2024-01-14T12:10:00') },
  { id: '7', type: 'withdraw', asset: 'SOL', amount: 10, usdValue: 980, status: 'failed', timestamp: new Date('2024-01-13T18:30:00') },
  { id: '8', type: 'deposit', asset: 'DOT', amount: 100, usdValue: 620, status: 'completed', timestamp: new Date('2024-01-13T11:20:00'), txHash: '0xqrst...uvwx' },
];

type SortField = 'timestamp' | 'amount' | 'usdValue' | 'type';
type SortOrder = 'asc' | 'desc';

const TransactionHistoryPage = () => {
  const [transactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | Transaction['type']>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | Transaction['status']>('all');
  const [sortField, setSortField] = useState<SortField>('timestamp');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [dateRange, setDateRange] = useState<'all' | '24h' | '7d' | '30d'>('all');

  // Filter and sort transactions
  const filteredTransactions = useMemo(() => {
    let filtered = [...transactions];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        tx =>
          tx.asset.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tx.txHash?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (tx.fromAsset?.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (tx.toAsset?.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(tx => tx.type === selectedType);
    }

    // Status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(tx => tx.status === selectedStatus);
    }

    // Date range filter
    if (dateRange !== 'all') {
      const now = new Date();
      const ranges = {
        '24h': 24 * 60 * 60 * 1000,
        '7d': 7 * 24 * 60 * 60 * 1000,
        '30d': 30 * 24 * 60 * 60 * 1000,
      };
      const range = ranges[dateRange];
      filtered = filtered.filter(tx => now.getTime() - tx.timestamp.getTime() <= range);
    }

    // Sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'timestamp':
          comparison = a.timestamp.getTime() - b.timestamp.getTime();
          break;
        case 'amount':
          comparison = a.amount - b.amount;
          break;
        case 'usdValue':
          comparison = a.usdValue - b.usdValue;
          break;
        case 'type':
          comparison = a.type.localeCompare(b.type);
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [transactions, searchQuery, selectedType, selectedStatus, dateRange, sortField, sortOrder]);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleSort = useCallback((field: SortField) => {
    if (sortField === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  }, [sortField]);

  const handleExport = useCallback(() => {
    alert('Export functionality - Coming soon!');
  }, []);

  const getTypeIcon = useCallback((type: Transaction['type']) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownIcon />;
      case 'withdraw':
        return <ArrowUpIcon />;
      case 'trade':
        return <SwapIcon />;
      case 'staking':
        return <CheckIcon />;
      default:
        return null;
    }
  }, []);

  const getTypeColor = useCallback((type: Transaction['type']) => {
    switch (type) {
      case 'deposit':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'withdraw':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'trade':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'staking':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  }, []);

  const getStatusColor = useCallback((status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'failed':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  }, []);

  // Calculate statistics
  const totalVolume = useMemo(() => {
    return filteredTransactions.reduce((sum, tx) => sum + tx.usdValue, 0);
  }, [filteredTransactions]);

  const completedCount = useMemo(() => {
    return filteredTransactions.filter(tx => tx.status === 'completed').length;
  }, [filteredTransactions]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 overflow-hidden">
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
              <span className="text-white">Transaction History</span>
            </div>

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white">
                  <ClockIcon />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">Transaction History</h1>
                  <p className="text-white/80">View all your deposits, withdrawals, trades, and staking activities</p>
                </div>
              </div>

              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all duration-300 hover:scale-105"
              >
                <DownloadIcon />
                Export
              </button>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
                <p className="text-white/70 text-sm mb-2">Total Transactions</p>
                <p className="text-3xl font-bold text-white">{filteredTransactions.length}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
                <p className="text-white/70 text-sm mb-2">Total Volume</p>
                <p className="text-3xl font-bold text-white">${totalVolume.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
                <p className="text-white/70 text-sm mb-2">Completed</p>
                <p className="text-3xl font-bold text-white">{completedCount}</p>
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
            {/* Search and Filters Row */}
            <div className="flex flex-col lg:flex-row items-center gap-4 mb-4">
              {/* Search */}
              <div className="flex-1 relative w-full">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <SearchIcon />
                </div>
                <input
                  type="text"
                  placeholder="Search by asset or transaction hash..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Date Range */}
              <div className="flex bg-gray-100 rounded-xl p-1">
                {(['all', '24h', '7d', '30d'] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setDateRange(range)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      dateRange === range ? 'bg-white text-black shadow-sm' : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    {range === 'all' ? 'All Time' : range.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Type and Status Filters */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <FilterIcon />
                <span className="text-sm font-medium text-gray-700">Type:</span>
                {(['all', 'deposit', 'withdraw', 'trade', 'staking'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedType === type ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm font-medium text-gray-700">Status:</span>
                {(['all', 'completed', 'pending', 'failed'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedStatus === status ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Transactions List */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-600">
              <button
                onClick={() => handleSort('timestamp')}
                className="col-span-2 text-left hover:text-black transition-colors flex items-center gap-1"
              >
                Date
                {sortField === 'timestamp' && (
                  <span className={`transition-transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`}>▼</span>
                )}
              </button>
              <button
                onClick={() => handleSort('type')}
                className="col-span-2 text-left hover:text-black transition-colors flex items-center gap-1"
              >
                Type
                {sortField === 'type' && (
                  <span className={`transition-transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`}>▼</span>
                )}
              </button>
              <div className="col-span-3 text-left">Details</div>
              <button
                onClick={() => handleSort('amount')}
                className="col-span-2 text-right hover:text-black transition-colors flex items-center justify-end gap-1"
              >
                Amount
                {sortField === 'amount' && (
                  <span className={`transition-transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`}>▼</span>
                )}
              </button>
              <button
                onClick={() => handleSort('usdValue')}
                className="col-span-2 text-right hover:text-black transition-colors flex items-center justify-end gap-1"
              >
                USD Value
                {sortField === 'usdValue' && (
                  <span className={`transition-transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`}>▼</span>
                )}
              </button>
              <div className="col-span-1 text-center">Status</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-100">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((tx, index) => (
                  <div
                    key={tx.id}
                    className="grid grid-cols-12 gap-4 px-6 py-5 hover:bg-gray-50 transition-colors animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Date */}
                    <div className="col-span-2 flex flex-col justify-center">
                      <p className="text-sm font-medium text-black">
                        {tx.timestamp.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                      <p className="text-xs text-gray-500">
                        {tx.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>

                    {/* Type */}
                    <div className="col-span-2 flex items-center">
                      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${getTypeColor(tx.type)}`}>
                        {getTypeIcon(tx.type)}
                        <span className="text-sm font-medium capitalize">{tx.type}</span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="col-span-3 flex flex-col justify-center">
                      {tx.type === 'trade' ? (
                        <>
                          <p className="text-sm font-medium text-black">
                            {tx.fromAsset} → {tx.toAsset}
                          </p>
                          <p className="text-xs text-gray-500">Trade executed</p>
                        </>
                      ) : (
                        <>
                          <p className="text-sm font-medium text-black">{tx.asset}</p>
                          {tx.txHash && (
                            <p className="text-xs text-gray-500 font-mono">
                              {tx.txHash}
                            </p>
                          )}
                        </>
                      )}
                    </div>

                    {/* Amount */}
                    <div className="col-span-2 text-right flex flex-col justify-center">
                      <p className="text-sm font-bold text-black">
                        {tx.amount.toLocaleString('en-US', { maximumFractionDigits: 8 })}
                      </p>
                      <p className="text-xs text-gray-500">{tx.asset}</p>
                    </div>

                    {/* USD Value */}
                    <div className="col-span-2 text-right flex flex-col justify-center">
                      <p className="text-sm font-bold text-black">
                        ${tx.usdValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </p>
                    </div>

                    {/* Status */}
                    <div className="col-span-1 flex items-center justify-center">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(tx.status)}`} title={tx.status} />
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-20 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <SearchIcon />
                  </div>
                  <p className="text-gray-500 font-medium">No transactions found</p>
                  <p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p>
                </div>
              )}
            </div>

            {/* Results Summary */}
            {filteredTransactions.length > 0 && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Showing <span className="font-bold text-black">{filteredTransactions.length}</span> of{' '}
                  <span className="font-bold text-black">{transactions.length}</span> transactions
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default memo(TransactionHistoryPage);

