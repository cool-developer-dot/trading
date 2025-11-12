'use client';

import { memo, useState, useCallback } from 'react';

interface APIEndpoint {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  description: string;
  category: string;
  authentication: boolean;
  parameters?: Array<{ name: string; type: string; required: boolean; description: string }>;
  response: string;
  exampleCode: string;
}

const apiEndpoints: APIEndpoint[] = [
  {
    id: '1',
    method: 'GET',
    endpoint: '/api/v1/market/prices',
    description: 'Get current market prices for all trading pairs',
    category: 'Market Data',
    authentication: false,
    parameters: [
      { name: 'symbol', type: 'string', required: false, description: 'Trading pair symbol (e.g., BTCUSDT)' },
      { name: 'limit', type: 'integer', required: false, description: 'Number of results (default: 100)' }
    ],
    response: '{\n  "data": [\n    {\n      "symbol": "BTCUSDT",\n      "price": "45123.50",\n      "change24h": "+2.45%",\n      "volume": "1234567890"\n    }\n  ],\n  "timestamp": 1699876543210\n}',
    exampleCode: `// JavaScript/Node.js
const response = await fetch('https://api.binance.com/api/v1/market/prices');
const data = await response.json();
console.log(data);

// Python
import requests
response = requests.get('https://api.binance.com/api/v1/market/prices')
data = response.json()
print(data)`
  },
  {
    id: '2',
    method: 'GET',
    endpoint: '/api/v1/account/balance',
    description: 'Get account balance for all assets',
    category: 'Account',
    authentication: true,
    response: '{\n  "balances": [\n    {\n      "asset": "BTC",\n      "free": "0.12345678",\n      "locked": "0.00000000"\n    },\n    {\n      "asset": "USDT",\n      "free": "1000.50",\n      "locked": "500.00"\n    }\n  ]\n}',
    exampleCode: `// JavaScript/Node.js
const response = await fetch('https://api.binance.com/api/v1/account/balance', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'X-Signature': 'HMAC_SHA256_SIGNATURE'
  }
});
const data = await response.json();

// Python
import requests
headers = {
  'Authorization': 'Bearer YOUR_API_KEY',
  'X-Signature': 'HMAC_SHA256_SIGNATURE'
}
response = requests.get('https://api.binance.com/api/v1/account/balance', headers=headers)
data = response.json()`
  },
  {
    id: '3',
    method: 'POST',
    endpoint: '/api/v1/order/create',
    description: 'Create a new order',
    category: 'Trading',
    authentication: true,
    parameters: [
      { name: 'symbol', type: 'string', required: true, description: 'Trading pair symbol' },
      { name: 'side', type: 'string', required: true, description: 'BUY or SELL' },
      { name: 'type', type: 'string', required: true, description: 'LIMIT or MARKET' },
      { name: 'quantity', type: 'decimal', required: true, description: 'Order quantity' },
      { name: 'price', type: 'decimal', required: false, description: 'Order price (required for LIMIT orders)' }
    ],
    response: '{\n  "orderId": "12345678",\n  "symbol": "BTCUSDT",\n  "side": "BUY",\n  "type": "LIMIT",\n  "quantity": "0.001",\n  "price": "45000.00",\n  "status": "NEW",\n  "timestamp": 1699876543210\n}',
    exampleCode: `// JavaScript/Node.js
const response = await fetch('https://api.binance.com/api/v1/order/create', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
    'X-Signature': 'HMAC_SHA256_SIGNATURE'
  },
  body: JSON.stringify({
    symbol: 'BTCUSDT',
    side: 'BUY',
    type: 'LIMIT',
    quantity: 0.001,
    price: 45000.00
  })
});

// Python
import requests
import json
headers = {
  'Authorization': 'Bearer YOUR_API_KEY',
  'Content-Type': 'application/json',
  'X-Signature': 'HMAC_SHA256_SIGNATURE'
}
data = {
  'symbol': 'BTCUSDT',
  'side': 'BUY',
  'type': 'LIMIT',
  'quantity': 0.001,
  'price': 45000.00
}
response = requests.post('https://api.binance.com/api/v1/order/create', headers=headers, json=data)`
  },
  {
    id: '4',
    method: 'GET',
    endpoint: '/api/v1/order/history',
    description: 'Get order history',
    category: 'Trading',
    authentication: true,
    parameters: [
      { name: 'symbol', type: 'string', required: false, description: 'Filter by trading pair' },
      { name: 'startTime', type: 'timestamp', required: false, description: 'Start time in milliseconds' },
      { name: 'endTime', type: 'timestamp', required: false, description: 'End time in milliseconds' },
      { name: 'limit', type: 'integer', required: false, description: 'Number of results (max: 1000)' }
    ],
    response: '{\n  "orders": [\n    {\n      "orderId": "12345678",\n      "symbol": "BTCUSDT",\n      "side": "BUY",\n      "type": "LIMIT",\n      "price": "45000.00",\n      "quantity": "0.001",\n      "filled": "0.001",\n      "status": "FILLED",\n      "timestamp": 1699876543210\n    }\n  ]\n}',
    exampleCode: `// JavaScript/Node.js
const response = await fetch('https://api.binance.com/api/v1/order/history?symbol=BTCUSDT&limit=50', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'X-Signature': 'HMAC_SHA256_SIGNATURE'
  }
});

// Python
import requests
params = {'symbol': 'BTCUSDT', 'limit': 50}
headers = {
  'Authorization': 'Bearer YOUR_API_KEY',
  'X-Signature': 'HMAC_SHA256_SIGNATURE'
}
response = requests.get('https://api.binance.com/api/v1/order/history', params=params, headers=headers)`
  },
  {
    id: '5',
    method: 'GET',
    endpoint: '/api/v1/market/klines',
    description: 'Get candlestick/kline data',
    category: 'Market Data',
    authentication: false,
    parameters: [
      { name: 'symbol', type: 'string', required: true, description: 'Trading pair symbol' },
      { name: 'interval', type: 'string', required: true, description: '1m, 5m, 1h, 1d, etc.' },
      { name: 'limit', type: 'integer', required: false, description: 'Number of candles (default: 500)' }
    ],
    response: '{\n  "data": [\n    {\n      "time": 1699876543210,\n      "open": "45000.00",\n      "high": "45500.00",\n      "low": "44800.00",\n      "close": "45200.00",\n      "volume": "123.456"\n    }\n  ]\n}',
    exampleCode: `// JavaScript/Node.js
const response = await fetch('https://api.binance.com/api/v1/market/klines?symbol=BTCUSDT&interval=1h&limit=100');
const data = await response.json();

// Python
import requests
params = {'symbol': 'BTCUSDT', 'interval': '1h', 'limit': 100}
response = requests.get('https://api.binance.com/api/v1/market/klines', params=params)
data = response.json()`
  },
  {
    id: '6',
    method: 'DELETE',
    endpoint: '/api/v1/order/cancel',
    description: 'Cancel an open order',
    category: 'Trading',
    authentication: true,
    parameters: [
      { name: 'orderId', type: 'string', required: true, description: 'Order ID to cancel' },
      { name: 'symbol', type: 'string', required: true, description: 'Trading pair symbol' }
    ],
    response: '{\n  "orderId": "12345678",\n  "status": "CANCELLED",\n  "message": "Order successfully cancelled"\n}',
    exampleCode: `// JavaScript/Node.js
const response = await fetch('https://api.binance.com/api/v1/order/cancel', {
  method: 'DELETE',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
    'X-Signature': 'HMAC_SHA256_SIGNATURE'
  },
  body: JSON.stringify({
    orderId: '12345678',
    symbol: 'BTCUSDT'
  })
});

// Python
import requests
headers = {
  'Authorization': 'Bearer YOUR_API_KEY',
  'Content-Type': 'application/json',
  'X-Signature': 'HMAC_SHA256_SIGNATURE'
}
data = {'orderId': '12345678', 'symbol': 'BTCUSDT'}
response = requests.delete('https://api.binance.com/api/v1/order/cancel', headers=headers, json=data)`
  }
];

const categories = ['All', 'Market Data', 'Account', 'Trading', 'WebSocket'];

const APIDocsPage = memo(() => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedEndpoint, setSelectedEndpoint] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
    setSelectedEndpoint(null);
  }, []);

  const handleEndpointClick = useCallback((id: string) => {
    setSelectedEndpoint(prev => prev === id ? null : id);
  }, []);

  const copyToClipboard = useCallback(async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  const filteredEndpoints = activeCategory === 'All'
    ? apiEndpoints
    : apiEndpoints.filter(endpoint => endpoint.category === activeCategory);

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-zinc-900 via-black to-zinc-900 py-20 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-yellow-500 text-sm font-medium mb-6">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              API Documentation
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              API <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">Documentation</span>
            </h1>

            <p className="text-xl text-zinc-400 mb-8">
              Build powerful trading applications with our RESTful API. Access market data, manage accounts, and execute trades programmatically.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <div className="px-6 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                <div className="text-sm text-zinc-500">Base URL</div>
                <div className="text-white font-mono text-sm">https://api.binance.com</div>
              </div>
              <div className="px-6 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                <div className="text-sm text-zinc-500">Version</div>
                <div className="text-white font-semibold">v1.0.0</div>
              </div>
              <div className="px-6 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                <div className="text-sm text-zinc-500">Rate Limit</div>
                <div className="text-white font-semibold">1200 req/min</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              {/* Category Filter */}
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-300 ${
                        activeCategory === category
                          ? 'bg-yellow-500 text-black font-semibold'
                          : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Resources</h3>
                <div className="space-y-3 text-sm">
                  <a href="#" className="flex items-center gap-2 text-zinc-400 hover:text-yellow-500 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                    </svg>
                    API Reference
                  </a>
                  <a href="#" className="flex items-center gap-2 text-zinc-400 hover:text-yellow-500 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                    </svg>
                    Getting Started
                  </a>
                  <a href="#" className="flex items-center gap-2 text-zinc-400 hover:text-yellow-500 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    Authentication
                  </a>
                  <a href="#" className="flex items-center gap-2 text-zinc-400 hover:text-yellow-500 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Error Codes
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* API Endpoints */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                {activeCategory === 'All' ? 'All Endpoints' : activeCategory}
              </h2>
              <span className="text-zinc-500">{filteredEndpoints.length} endpoints</span>
            </div>

            {filteredEndpoints.map(endpoint => (
              <div
                key={endpoint.id}
                className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden hover:border-yellow-500/30 transition-all duration-300"
              >
                <button
                  onClick={() => handleEndpointClick(endpoint.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-bold ${
                          endpoint.method === 'GET'
                            ? 'bg-green-500/20 text-green-400'
                            : endpoint.method === 'POST'
                            ? 'bg-blue-500/20 text-blue-400'
                            : endpoint.method === 'PUT'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {endpoint.method}
                      </span>
                      <code className="text-white font-mono text-sm">{endpoint.endpoint}</code>
                      {endpoint.authentication && (
                        <span className="px-2 py-1 bg-zinc-800 rounded text-xs text-zinc-400 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                          Auth Required
                        </span>
                      )}
                    </div>
                    <p className="text-zinc-400 text-sm">{endpoint.description}</p>
                  </div>
                  <svg
                    className={`w-6 h-6 text-zinc-500 transition-transform duration-300 flex-shrink-0 ml-4 ${
                      selectedEndpoint === endpoint.id ? 'rotate-180 text-yellow-500' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {selectedEndpoint === endpoint.id && (
                  <div className="px-6 pb-6 space-y-6 animate-fade-in">
                    {/* Parameters */}
                    {endpoint.parameters && endpoint.parameters.length > 0 && (
                      <div>
                        <h4 className="text-white font-semibold mb-3">Parameters</h4>
                        <div className="bg-zinc-800/50 rounded-lg p-4 space-y-3">
                          {endpoint.parameters.map(param => (
                            <div key={param.name} className="flex items-start gap-3">
                              <code className="text-yellow-500 text-sm font-mono">{param.name}</code>
                              <span className={`px-2 py-0.5 rounded text-xs ${param.required ? 'bg-red-500/20 text-red-400' : 'bg-zinc-700 text-zinc-400'}`}>
                                {param.required ? 'required' : 'optional'}
                              </span>
                              <span className="text-zinc-500 text-xs">{param.type}</span>
                              <span className="text-zinc-400 text-sm flex-1">{param.description}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Response */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-white font-semibold">Response</h4>
                        <button
                          onClick={() => copyToClipboard(endpoint.response, `response-${endpoint.id}`)}
                          className="text-xs text-zinc-400 hover:text-yellow-500 transition-colors flex items-center gap-1"
                        >
                          {copiedId === `response-${endpoint.id}` ? (
                            <>
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              Copied!
                            </>
                          ) : (
                            <>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="bg-zinc-800/50 rounded-lg p-4 overflow-x-auto">
                        <code className="text-green-400 text-sm font-mono">{endpoint.response}</code>
                      </pre>
                    </div>

                    {/* Example Code */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-white font-semibold">Example Code</h4>
                        <button
                          onClick={() => copyToClipboard(endpoint.exampleCode, `code-${endpoint.id}`)}
                          className="text-xs text-zinc-400 hover:text-yellow-500 transition-colors flex items-center gap-1"
                        >
                          {copiedId === `code-${endpoint.id}` ? (
                            <>
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              Copied!
                            </>
                          ) : (
                            <>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="bg-zinc-800/50 rounded-lg p-4 overflow-x-auto">
                        <code className="text-blue-400 text-sm font-mono whitespace-pre">{endpoint.exampleCode}</code>
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <section className="mt-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-black mb-4">Need Help Getting Started?</h2>
          <p className="text-lg text-black/80 mb-8">Check out our comprehensive guides and tutorials</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/help-center" className="px-8 py-4 bg-black text-white font-semibold rounded-xl hover:bg-zinc-900 transition-all duration-300 transform hover:scale-105">
              View Documentation
            </a>
            <a href="/contact" className="px-8 py-4 bg-white text-black font-semibold rounded-xl hover:bg-zinc-100 transition-all duration-300 transform hover:scale-105">
              Contact Support
            </a>
          </div>
        </section>
      </main>
    </div>
  );
});

APIDocsPage.displayName = 'APIDocsPage';

export default APIDocsPage;

