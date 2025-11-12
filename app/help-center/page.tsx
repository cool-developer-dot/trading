'use client';

import { memo, useState, useMemo, useCallback } from 'react';
import Link from 'next/link';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
}

const faqData: FAQItem[] = [
  {
    id: '1',
    question: 'How do I create an account?',
    answer: 'Creating an account is simple: Click the "Sign Up" button, enter your email and create a strong password, verify your email address, complete identity verification (KYC), and start trading! The entire process typically takes 5-10 minutes.',
    category: 'Getting Started',
    tags: ['account', 'signup', 'registration']
  },
  {
    id: '2',
    question: 'How do I deposit funds?',
    answer: 'To deposit funds: Log in to your account, go to "Wallet" > "Deposit", select the cryptocurrency or fiat currency you want to deposit, copy your deposit address or follow bank transfer instructions, and send funds from your external wallet or bank. Crypto deposits usually arrive within minutes.',
    category: 'Deposits & Withdrawals',
    tags: ['deposit', 'funding', 'transfer']
  },
  {
    id: '3',
    question: 'What are the trading fees?',
    answer: 'Our fee structure is competitive: Spot trading starts at 0.1% per trade, Futures trading from 0.02% maker / 0.04% taker. VIP users enjoy reduced fees based on trading volume. Hold platform tokens for additional discounts up to 25%.',
    category: 'Trading',
    tags: ['fees', 'costs', 'pricing']
  },
  {
    id: '4',
    question: 'How long do withdrawals take?',
    answer: 'Withdrawal times vary by currency: Cryptocurrency withdrawals process within 30 minutes after approval. Bank transfers take 1-5 business days depending on your country. We process withdrawals 24/7 for crypto and during business hours for fiat.',
    category: 'Deposits & Withdrawals',
    tags: ['withdrawal', 'cashout', 'time']
  },
  {
    id: '5',
    question: 'Is my account secure?',
    answer: 'Security is our top priority: 2FA (Two-Factor Authentication) required for all accounts, Cold storage for 95% of user funds, Multi-signature wallets for enhanced security, Regular security audits by third parties, Insurance fund to protect users, and 24/7 security monitoring.',
    category: 'Security',
    tags: ['security', 'safety', '2fa']
  },
  {
    id: '6',
    question: 'What is KYC verification?',
    answer: 'KYC (Know Your Customer) is a verification process: Upload a government-issued ID (passport, driver\'s license), Take a selfie for facial recognition, Provide proof of address (utility bill, bank statement), Verification usually completes within 24 hours. KYC helps us comply with regulations and protect your account.',
    category: 'Account Verification',
    tags: ['kyc', 'verification', 'identity']
  },
  {
    id: '7',
    question: 'How do I enable 2FA?',
    answer: 'Enable Two-Factor Authentication: Go to Security Settings, Select "Enable 2FA", Download Google Authenticator or Authy app, Scan the QR code provided, Enter the 6-digit code from your app, Save your backup codes in a safe place. 2FA is mandatory for withdrawals.',
    category: 'Security',
    tags: ['2fa', 'security', 'authentication']
  },
  {
    id: '8',
    question: 'What payment methods are accepted?',
    answer: 'We support multiple payment methods: Bank transfers (SEPA, ACH, Wire), Credit/Debit cards (Visa, Mastercard), Cryptocurrency deposits (100+ coins), Third-party payment processors (varies by region), P2P trading with various local payment methods.',
    category: 'Deposits & Withdrawals',
    tags: ['payment', 'deposit', 'methods']
  },
  {
    id: '9',
    question: 'How do I start margin trading?',
    answer: 'To start margin trading: Complete KYC verification, Transfer funds to your margin wallet, Select margin trading mode (Isolated or Cross), Choose your leverage (up to 10x), Place your order with margin enabled. Warning: Margin trading involves significant risk.',
    category: 'Trading',
    tags: ['margin', 'leverage', 'trading']
  },
  {
    id: '10',
    question: 'What should I do if I forget my password?',
    answer: 'To reset your password: Click "Forgot Password" on login page, Enter your registered email address, Check your email for reset link, Click the link and create a new password, You may need to verify via 2FA. Contact support if you don\'t receive the email.',
    category: 'Account Management',
    tags: ['password', 'reset', 'forgot']
  },
  {
    id: '11',
    question: 'How do I contact customer support?',
    answer: 'Multiple ways to reach us: 24/7 Live Chat for instant assistance, Email support (support@binance.com), Submit a ticket through Help Center, Community forums for peer support, Social media (@binance) for updates. Average response time is under 1 hour.',
    category: 'Support',
    tags: ['support', 'help', 'contact']
  },
  {
    id: '12',
    question: 'Are there withdrawal limits?',
    answer: 'Withdrawal limits depend on verification level: Unverified: 0.06 BTC / day, Basic KYC: 100 BTC / day, Advanced KYC: Unlimited, Corporate accounts: Custom limits. Higher limits available upon request for institutional clients.',
    category: 'Account Management',
    tags: ['limits', 'withdrawal', 'kyc']
  }
];

const categories = [
  { name: 'All', icon: '📚' },
  { name: 'Getting Started', icon: '🚀' },
  { name: 'Trading', icon: '💹' },
  { name: 'Deposits & Withdrawals', icon: '💰' },
  { name: 'Security', icon: '🔒' },
  { name: 'Account Verification', icon: '✅' },
  { name: 'Account Management', icon: '👤' },
  { name: 'Support', icon: '💬' }
];

const HelpCenterPage = memo(() => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
    setExpandedFAQ(null);
  }, []);

  const toggleFAQ = useCallback((id: string) => {
    setExpandedFAQ(prev => prev === id ? null : id);
  }, []);

  const filteredFAQs = useMemo(() => {
    let filtered = faqData;

    if (activeCategory !== 'All') {
      filtered = filtered.filter(faq => faq.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(faq =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-zinc-900 via-black to-zinc-900 py-20 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-yellow-500 text-sm font-medium">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              We're here to help
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white">
              Help <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">Center</span>
            </h1>

            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Find answers to common questions, guides, and tutorials to make the most of your trading experience
            </p>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto mt-8">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Search for help articles, FAQs, guides..."
                  className="w-full px-6 py-5 pl-14 bg-zinc-900 border border-zinc-800 rounded-2xl text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 text-lg"
                />
                <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center justify-center gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">1,000+</div>
                <div className="text-sm text-zinc-500">Articles</div>
              </div>
              <div className="w-px h-12 bg-zinc-800" />
              <div className="text-center">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-sm text-zinc-500">Support</div>
              </div>
              <div className="w-px h-12 bg-zinc-800" />
              <div className="text-center">
                <div className="text-3xl font-bold text-white">&lt;1hr</div>
                <div className="text-sm text-zinc-500">Response</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Quick Links */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Popular Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/help-center" className="group p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-yellow-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10">
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-yellow-500 transition-colors">Getting Started</h3>
              <p className="text-sm text-zinc-500">Learn the basics</p>
            </Link>

            <Link href="/help-center" className="group p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-yellow-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10">
              <div className="text-4xl mb-3">💰</div>
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-yellow-500 transition-colors">Deposits & Withdrawals</h3>
              <p className="text-sm text-zinc-500">Manage your funds</p>
            </Link>

            <Link href="/help-center" className="group p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-yellow-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10">
              <div className="text-4xl mb-3">🔒</div>
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-yellow-500 transition-colors">Security</h3>
              <p className="text-sm text-zinc-500">Keep your account safe</p>
            </Link>

            <Link href="/help-center" className="group p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-yellow-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10">
              <div className="text-4xl mb-3">💹</div>
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-yellow-500 transition-colors">Trading Guides</h3>
              <p className="text-sm text-zinc-500">Master trading</p>
            </Link>
          </div>
        </section>

        {/* Categories */}
        <section className="mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category.name}
                onClick={() => handleCategoryChange(category.name)}
                className={`px-5 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeCategory === category.name
                    ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/30'
                    : 'bg-zinc-900/50 text-zinc-400 border border-zinc-800 hover:border-yellow-500/50 hover:text-white'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              {searchQuery ? 'Search Results' : 'Frequently Asked Questions'}
            </h2>
            <span className="text-zinc-500">{filteredFAQs.length} articles</span>
          </div>

          {filteredFAQs.length > 0 ? (
            <div className="space-y-3">
              {filteredFAQs.map(faq => (
                <div
                  key={faq.id}
                  className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden hover:border-yellow-500/30 transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left group"
                  >
                    <div className="flex-1 pr-4">
                      <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-yellow-500 transition-colors">
                        {faq.question}
                      </h3>
                      <span className="text-sm text-zinc-500">{faq.category}</span>
                    </div>
                    <svg
                      className={`w-6 h-6 text-zinc-500 transition-transform duration-300 flex-shrink-0 ${
                        expandedFAQ === faq.id ? 'rotate-180 text-yellow-500' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {expandedFAQ === faq.id && (
                    <div className="px-6 pb-5 animate-fade-in">
                      <p className="text-zinc-300 leading-relaxed">{faq.answer}</p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {faq.tags.map(tag => (
                          <span key={tag} className="text-xs px-3 py-1 bg-zinc-800 text-zinc-400 rounded-full">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-zinc-900 rounded-full mb-6">
                <svg className="w-10 h-10 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No results found</h3>
              <p className="text-zinc-500 mb-6">Try adjusting your search or browse by category</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                }}
                className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-600 transition-colors duration-300"
              >
                Clear Search
              </button>
            </div>
          )}
        </section>

        {/* Contact Support CTA */}
        <section className="mt-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-black mb-4">Still need help?</h2>
          <p className="text-lg text-black/80 mb-8">Our support team is available 24/7 to assist you</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="px-8 py-4 bg-black text-white font-semibold rounded-xl hover:bg-zinc-900 transition-all duration-300 transform hover:scale-105">
              Contact Support
            </Link>
            <Link href="/chat" className="px-8 py-4 bg-white text-black font-semibold rounded-xl hover:bg-zinc-100 transition-all duration-300 transform hover:scale-105">
              Live Chat
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
});

HelpCenterPage.displayName = 'HelpCenterPage';

export default HelpCenterPage;

