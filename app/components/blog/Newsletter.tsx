'use client';

import { memo, useCallback, useState } from 'react';

const Newsletter = memo(() => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setStatus('success');
    setEmail('');
    
    setTimeout(() => setStatus('idle'), 3000);
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  return (
    <section 
      className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl p-8 md:p-12 relative overflow-hidden"
      role="form"
      aria-label="Newsletter subscription"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-black rounded-full -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black rounded-full translate-y-24 -translate-x-24" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 bg-black/20 rounded-2xl mb-6">
          <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>

        {/* Title */}
        <h3 className="text-3xl md:text-4xl font-bold text-black mb-4">
          Never Miss an Update
        </h3>

        {/* Description */}
        <p className="text-lg text-black/80 mb-8">
          Subscribe to our newsletter and get the latest crypto insights, trading tips, and market analysis delivered directly to your inbox.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
          <input
            type="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter your email address"
            required
            disabled={status === 'loading' || status === 'success'}
            className="flex-1 px-6 py-4 bg-white text-black placeholder-zinc-500 rounded-xl focus:outline-none focus:ring-4 focus:ring-black/20 transition-all duration-300 disabled:opacity-50"
            aria-label="Email address"
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="px-8 py-4 bg-black text-white font-semibold rounded-xl hover:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-black/30 transition-all duration-300 disabled:opacity-50 whitespace-nowrap"
          >
            {status === 'loading' && 'Subscribing...'}
            {status === 'success' && '✓ Subscribed!'}
            {(status === 'idle' || status === 'error') && 'Subscribe Now'}
          </button>
        </form>

        {/* Success Message */}
        {status === 'success' && (
          <p className="mt-4 text-black font-medium animate-fade-in">
            🎉 Thank you for subscribing! Check your inbox for confirmation.
          </p>
        )}

        {/* Trust Badge */}
        <p className="mt-6 text-sm text-black/70">
          Join 50,000+ crypto enthusiasts. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
});

Newsletter.displayName = 'Newsletter';

export default Newsletter;

